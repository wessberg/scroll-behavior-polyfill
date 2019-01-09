/**
 * Gets the scrollTop version of an element. If a window is provided, the 'pageYOffset' is used.
 * @param {Element | Window} element
 * @returns {number}
 */
export function getScrollTop (element: Element|Window): number {
	if (element instanceof Element) return element.scrollTop;
	return element.pageYOffset;
}