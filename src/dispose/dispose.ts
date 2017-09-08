import {unwrapScroll} from "../wrapper/unwrap-scroll/unwrap-scroll";
import {getElementsForSelectors} from "../util/get-elements-for-selectors";

/**
 * Disposes all elements that has once had a 'scroll-behavior' CSS property value of 'smooth' but hasn't anymore
 * @param {string[]} selectors
 */
export function disposeElements (selectors: string[]): void {
	getElementsForSelectors(selectors).forEach(element => disposeElement(element));
}

/**
 * Disposes an element that has once had a 'scroll-behavior' CSS property value of 'smooth' but hasn't anymore
 * @param {HTMLElement} element
 */
export function disposeElement (element: HTMLElement): void {
	unwrapScroll(element);
}
