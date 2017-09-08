/**
 * Updates the scroll position of an element
 * @param {HTMLElement} element
 * @param {number} x
 * @param {number} y
 */
export function updateScrollPosition (element: HTMLElement, x: number, y: number): void {
	element.scrollLeft = x;
	element.scrollTop = y;
}
