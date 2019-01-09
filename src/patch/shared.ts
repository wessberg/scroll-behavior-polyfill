import {ELEMENT_ORIGINAL_SCROLL} from "../original/element/scroll";
import {ELEMENT_ORIGINAL_SCROLL_BY} from "../original/element/scroll-by";
import {ELEMENT_ORIGINAL_SCROLL_TO} from "../original/element/scroll-to";
import {getScrollBehavior} from "../util/get-scroll-behavior";
import {smoothScroll} from "../smooth-scroll/smooth-scroll/smooth-scroll";
import {getSmoothScrollOptions, ScrollMethodName} from "../smooth-scroll/get-smooth-scroll-options/get-smooth-scroll-options";
import {getScrollLeft} from "../util/get-scroll-left";
import {ensureNumeric} from "../util/ensure-numeric";
import {getScrollTop} from "../util/get-scroll-top";
import {isScrollToOptions} from "../util/is-scroll-to-options";
import {WINDOW_ORIGINAL_SCROLL} from "../original/window/scroll";
import {WINDOW_ORIGINAL_SCROLL_BY} from "../original/window/scroll-by";
import {WINDOW_ORIGINAL_SCROLL_TO} from "../original/window/scroll-to";

/**
 * Handles a scroll method
 * @param {Element|Window} element
 * @param {ScrollMethodName} kind
 * @param {number | ScrollToOptions} optionsOrX
 * @param {number} y
 */
export function handleScrollMethod (element: Element|Window, kind: ScrollMethodName, optionsOrX?: number|ScrollToOptions, y?: number): void {
	// If only one argument is given, and it isn't an options object, throw a TypeError
	if (y === undefined && !isScrollToOptions(optionsOrX)) {
		throw new TypeError("Failed to execute 'scroll' on 'Element': parameter 1 ('options') is not an object.");
	}

	// Scroll based on the primitive values given as arguments
	if (!isScrollToOptions(optionsOrX)) {
		const {left, top} = normalizeScrollCoordinates(optionsOrX, y, element, kind);
		onScrollPrimitive(left, top, element, kind);
	}

	// Scroll based on the received options object
	else {
		onScrollWithOptions({
			...normalizeScrollCoordinates(optionsOrX.left, optionsOrX.top, element, kind),
			behavior: optionsOrX.behavior == null ? "auto" : optionsOrX.behavior
		}, element, kind);
	}
}

/**
 * Gets the original non-patched prototype method for the given kind
 * @param {ScrollMethodName} kind
 * @param {Element|Window} element
 * @return {Function}
 */
function getOriginalPrototypeMethodForKind (kind: ScrollMethodName, element: Element|Window) {
	switch (kind) {
		case "scroll":
			return element instanceof Element ? ELEMENT_ORIGINAL_SCROLL : WINDOW_ORIGINAL_SCROLL;
		case "scrollBy":
			return element instanceof Element ? ELEMENT_ORIGINAL_SCROLL_BY : WINDOW_ORIGINAL_SCROLL_BY;
		case "scrollTo":
			return element instanceof Element ? ELEMENT_ORIGINAL_SCROLL_TO : WINDOW_ORIGINAL_SCROLL_TO;
	}
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
		getOriginalPrototypeMethodForKind(kind, element).call(element, options.left, options.top);
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
 * Invoked when 'scroll()' is invoked with primitive x or y values
 * @param {number} x
 * @param {number} y
 * @param {ScrollMethodName} kind
 * @param {Element|Window} element
 */
function onScrollPrimitive (x: number, y: number, element: Element|Window, kind: ScrollMethodName): void {
	// noinspection SuspiciousTypeOfGuard
	return onScrollWithOptions({
		left: x,
		top: y,
		behavior: "auto"
	}, element, kind);
}

/**
 * Normalizes the given scroll coordinates
 * @param {number?} x
 * @param {number?} y
 * @param {Element|Window} element
 * @param {ScrollMethodName} kind
 * @return {Required<Pick<ScrollToOptions, "top" | "left">>}
 */
function normalizeScrollCoordinates (x: number|undefined, y: number|undefined, element: Element|Window, kind: ScrollMethodName): Required<Pick<ScrollToOptions, "top"|"left">> {
	switch (kind) {
		case "scrollBy":
			return {
				left: getScrollLeft(element) + ensureNumeric(x),
				top: getScrollTop(element) + ensureNumeric(y)
			};
		default:
			return {
				left: ensureNumeric(x),
				top: ensureNumeric(y)
			};
	}
}