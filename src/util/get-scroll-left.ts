/**
 * Gets the scrollLeft version of an element. If a window is provided, the 'pageXOffset' is used.
 * @param {Element | Window} element
 * @returns {number}
 */
export function getScrollLeft (element: Element|Window): number {
	if (element instanceof Element) return element.scrollLeft;
	return element.pageXOffset;
}