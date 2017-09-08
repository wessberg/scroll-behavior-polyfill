/**
 * Gets the scrollLeft version of an element. If a window is provided, the 'pageXOffset' is used.
 * @param {HTMLElement | Window} element
 * @returns {number}
 */
export function getScrollLeft (element: HTMLElement|Window): number {
	if (element instanceof Element) return element.scrollLeft;
	return element.pageXOffset;
}