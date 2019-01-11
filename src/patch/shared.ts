import {getScrollBehavior} from "../util/get-scroll-behavior";
import {smoothScroll} from "../smooth-scroll/smooth-scroll/smooth-scroll";
import {getSmoothScrollOptions} from "../smooth-scroll/get-smooth-scroll-options/get-smooth-scroll-options";
import {ensureNumeric} from "../util/ensure-numeric";
import {isScrollToOptions} from "../util/is-scroll-to-options";
import {ScrollMethodName} from "../scroll-method/scroll-method-name";
import {getOriginalScrollMethodForKind} from "../scroll-method/get-original-scroll-method-for-kind";

/**
 * Handles a scroll method
 * @param {Element|Window} element
 * @param {ScrollMethodName} kind
 * @param {number | ScrollToOptions} optionsOrX
 * @param {number} y
 */
export function handleScrollMethod (element: Element|Window, kind: ScrollMethodName, optionsOrX?: number|ScrollToOptions, y?: number): void {
	onScrollWithOptions(
		getScrollToOptionsWithValidation(optionsOrX, y),
		element,
		kind
	);
}

/**
 * Invoked when a 'ScrollToOptions' dict is provided to 'scroll()' as the first argument
 * @param {ScrollToOptions} options
 * @param {Element|Window} element
 * @param {ScrollMethodName} kind
 */
function onScrollWithOptions (options: Required<ScrollToOptions>, element: Element|Window, kind: ScrollMethodName): void {
	const behavior = getScrollBehavior(element, options);

	// If the behavior is 'auto' apply instantaneous scrolling
	if (behavior == null || behavior === "auto") {
		getOriginalScrollMethodForKind(kind, element).call(element, options.left, options.top);
	}

	else {
		smoothScroll(getSmoothScrollOptions(
			element,
			options.left,
			options.top,
			kind
		));
	}
}

/**
 * Normalizes the given scroll coordinates
 * @param {number?} x
 * @param {number?} y
 * @return {Required<Pick<ScrollToOptions, "top" | "left">>}
 */
function normalizeScrollCoordinates (x: number|undefined, y: number|undefined): Required<Pick<ScrollToOptions, "top"|"left">> {
	return {
		left: ensureNumeric(x),
		top: ensureNumeric(y)
	};
}

/**
 * Gets ScrollToOptions based on the given arguments. Will throw if validation fails
 * @param {number | ScrollToOptions} optionsOrX
 * @param {number} y
 * @return {Required<ScrollToOptions>}
 */
function getScrollToOptionsWithValidation (optionsOrX?: number|ScrollToOptions, y?: number): Required<ScrollToOptions> {
	// If only one argument is given, and it isn't an options object, throw a TypeError
	if (y === undefined && !isScrollToOptions(optionsOrX)) {
		throw new TypeError("Failed to execute 'scroll' on 'Element': parameter 1 ('options') is not an object.");
	}

	// Scroll based on the primitive values given as arguments
	if (!isScrollToOptions(optionsOrX)) {
		return {
			...normalizeScrollCoordinates(optionsOrX, y),
			behavior: "auto"
		};
	}

	// Scroll based on the received options object
	else {
		return {
			...normalizeScrollCoordinates(optionsOrX.left, optionsOrX.top),
			behavior: optionsOrX.behavior == null ? "auto" : optionsOrX.behavior
		};
	}
}