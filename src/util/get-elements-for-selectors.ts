/**
 * Gets all HTMLElements matched by the provided selectors
 * @param {string[]} selectors
 * @returns {HTMLElement[]}
 */
export function getElementsForSelectors (selectors: string[]): HTMLElement[] {
	// Match all of the selectors
	const elements: HTMLElement[] = [];
	selectors.forEach(selector => {
		const element = getElementForSelector(selector);
		if (element != null) elements.push(element);
	});
	return elements;
}

/**
 * Gets an element for the provided selector
 * @param {string} selector
 * @returns {HTMLElement}
 */
export function getElementForSelector (selector: string): HTMLElement|null {
	return <HTMLElement> document.querySelector(selector);
}