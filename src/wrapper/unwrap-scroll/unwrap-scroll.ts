import {getWrapper} from "../element-wrapper/element-wrapper";

/**
 * Unwraps the scroll method
 * @param {HTMLElement} element
 */
export function unwrapScroll (element: HTMLElement): void {
	const wrapper = getWrapper(element);
	// If there is no wrapper, do nothing
	if (wrapper == null) return;

	// Otherwise, re-associate the original prototype methods with the element
	element.scroll = wrapper.scroll.original;
	element.scrollTo = wrapper.scrollTo.original;
}
