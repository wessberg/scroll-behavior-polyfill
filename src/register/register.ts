import {wrapScroll} from "../wrapper/wrap-scroll/wrap-scroll";
import {getElementsForSelectors} from "../util/get-elements-for-selectors";

/**
 * Registers all elements with a scroll-behavior CSS-property value of 'smooth'
 * @param {string[]} selectors
 */
export function registerElements (selectors: string[]): void {
	getElementsForSelectors(selectors).forEach(element => registerElement(element));
}

/**
 * Registers an element with a scroll-behavior CSS-property value of 'smooth'
 * @param {HTMLElement} element
 */
export function registerElement (element: HTMLElement): void {
	wrapScroll(element);
}
