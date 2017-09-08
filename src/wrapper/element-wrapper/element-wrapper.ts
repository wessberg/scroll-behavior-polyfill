import {ElementWrapperMap} from "./element-wrapper-map";
import {IElementWrapper} from "./i-element-wrapper";

/**
 * A Map between elements and their IElementWrapper
 * @type {Map<any, any>}
 */
const ELEMENT_WRAPPER: ElementWrapperMap = new Map();

/**
 * Adds an IElementWrapper
 * @param {HTMLElement} element
 * @param {IElementWrapper} wrapper
 */
export function addWrapper (element: HTMLElement, wrapper: IElementWrapper): void {
	ELEMENT_WRAPPER.set(element, wrapper);
}

/**
 * Gets an IElementWrapper, if any exists for the provided element
 * @param {HTMLElement} element
 * @returns {IElementWrapper}
 */
export function getWrapper (element: HTMLElement): IElementWrapper|undefined {
	return ELEMENT_WRAPPER.get(element);
}
