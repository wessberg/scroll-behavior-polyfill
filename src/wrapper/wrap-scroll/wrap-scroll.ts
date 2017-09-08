import {ScrollBehaviorKind} from "../../scroll-behavior-kind/scroll-behavior-kind";
import {addWrapper, getWrapper} from "../element-wrapper/element-wrapper";
import {smoothScroll} from "../../smooth-scroll/smooth-scroll/smooth-scroll";
import {getSmoothScrollOptions} from "../../smooth-scroll/get-smooth-scroll-options/get-smooth-scroll-options";
import {getScrollLeft} from "../../util/get-scroll-left";
import {getScrollTop} from "../../util/get-scroll-top";

/**
 * Wraps the scroll method
 * @param {HTMLElement} element
 */
export function wrapScroll (element: HTMLElement): void {
	const target = element instanceof HTMLHtmlElement || element instanceof HTMLBodyElement ? window : element;

	// Check if the target has already been wrapped, and if so, apply the original scroll function from it
	const wrapped = getWrapper(<HTMLElement>target);
	const originalScroll = wrapped == null ? target.scroll : wrapped.scroll.original;
	const originalScrollTo = wrapped == null ? target.scrollTo : wrapped.scrollTo.original;
	const originalScrollBy = wrapped == null ? target.scrollBy : wrapped.scrollBy.original;

	target.scroll = onScroll.bind(target, target, originalScroll, "scroll");
	target.scrollTo = onScroll.bind(target, target, originalScrollTo, "scroll");
	target.scrollBy = onScroll.bind(target, target, originalScrollBy, "scrollBy");

	// Store it so we can retrieve the original handlers later on
	addWrapper(<HTMLElement>target, {
		scroll: {
			original: originalScroll,
			wrapped: target.scroll
		},
		scrollTo: {
			original: originalScrollTo,
			wrapped: target.scrollTo
		},
		scrollBy: {
			original: originalScrollBy,
			wrapped: target.scrollBy
		}
	});
}

/**
 * Called when 'scroll()' is invoked on the element
 * @param {HTMLElement} element
 * @param {Function} original
 * @param {string} kind
 * @param {number | ScrollToOptions} x
 * @param {number} y
 */
function onScroll (element: HTMLElement, original: Function, kind: "scroll"|"scrollBy", x: number|ScrollToOptions, y: number): void {
	if (typeof x === "number") {
		onScrollPrimitive(x, y, element, original, kind);
	} else {
		onScrollWithOptions(x, element, original, kind);
	}
}

/**
 * Invoked when a 'ScrollToOptions' dict is provided to 'scroll()' as the first argument
 * @param {ScrollToOptions} options
 * @param {HTMLElement} element
 * @param {Function} original
 * @param {string} kind
 */
function onScrollWithOptions (options: ScrollToOptions, element: HTMLElement, original: Function, kind: "scroll"|"scrollBy"): void {
	// If scrolling is explicitly requested non-smooth, invoke the original scroll function
	if (options.behavior != null && options.behavior !== ScrollBehaviorKind.SMOOTH) {
		original(options);
	} else {
		// Otherwise, invoke the primitive scroll function
		const normalizedLeft = options.left == null ? 0 : options.left;
		const normalizedTop = options.top == null ? 0 : options.top;
		onScrollPrimitive(normalizedLeft, normalizedTop, element, original, kind);
	}
}

/**
 * Invoked when 'scroll()' is invoked with primitive x or y values
 * @param {number} x
 * @param {number} y
 * @param {HTMLElement} element
 * @param {Function} original
 * @param {string} kind
 */
function onScrollPrimitive (x: number, y: number, element: HTMLElement, original: Function, kind: "scroll"|"scrollBy"): void {
	const normalizedX = kind === "scroll" ? x : getScrollLeft(element) + x;
	const normalizedY = kind === "scroll" ? y : getScrollTop(element) + y;

	smoothScroll(getSmoothScrollOptions(element, normalizedX, normalizedY, original));
}