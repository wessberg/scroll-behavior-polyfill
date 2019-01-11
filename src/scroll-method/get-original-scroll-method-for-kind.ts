import {ScrollMethodName} from "./scroll-method-name";
import {ELEMENT_ORIGINAL_SCROLL} from "../original/element/scroll";
import {WINDOW_ORIGINAL_SCROLL} from "../original/window/scroll";
import {ELEMENT_ORIGINAL_SCROLL_BY} from "../original/element/scroll-by";
import {WINDOW_ORIGINAL_SCROLL_BY} from "../original/window/scroll-by";
import {ELEMENT_ORIGINAL_SCROLL_TO} from "../original/element/scroll-to";
import {WINDOW_ORIGINAL_SCROLL_TO} from "../original/window/scroll-to";
import {IAdjustableElement} from "../adjustable-element/i-adjustable-element";

/**
 * A fallback if Element.prototype.scroll is not defined
 * @param {number} x
 * @param {number} y
 */
function elementPrototypeScrollFallback (this: IAdjustableElement, x: number, y: number): void {
	this.__adjustingScrollPosition = true;
	this.scrollLeft = x;
	this.scrollTop = y;
	delete this.__adjustingScrollPosition;
}

/**
 * A fallback if Element.prototype.scrollTo is not defined
 * @param {number} x
 * @param {number} y
 */
function elementPrototypeScrollToFallback (this: IAdjustableElement, x: number, y: number): void {
	return elementPrototypeScrollFallback.call(this, x, y);
}

/**
 * A fallback if Element.prototype.scrollBy is not defined
 * @param {number} x
 * @param {number} y
 */
function elementPrototypeScrollByFallback (this: IAdjustableElement, x: number, y: number): void {
	this.__adjustingScrollPosition = true;
	this.scrollLeft += x;
	this.scrollTop += y;
	delete this.__adjustingScrollPosition;
}

/**
 * Gets the original non-patched prototype method for the given kind
 * @param {ScrollMethodName} kind
 * @param {Element|Window} element
 * @return {Function}
 */
export function getOriginalScrollMethodForKind (kind: ScrollMethodName, element: Element|Window): Function {
	switch (kind) {

		case "scroll":
			if (element instanceof Element) {
				if (ELEMENT_ORIGINAL_SCROLL != null) {
					return ELEMENT_ORIGINAL_SCROLL;
				}
				else {
					return elementPrototypeScrollFallback;
				}
			}
			else {
				return WINDOW_ORIGINAL_SCROLL;
			}

		case "scrollBy":
			if (element instanceof Element) {
				if (ELEMENT_ORIGINAL_SCROLL_BY != null) {
					return ELEMENT_ORIGINAL_SCROLL_BY;
				}
				else {
					return elementPrototypeScrollByFallback;
				}
			}
			else {
				return WINDOW_ORIGINAL_SCROLL_BY;
			}

		case "scrollTo":
			if (element instanceof Element) {
				if (ELEMENT_ORIGINAL_SCROLL_TO != null) {
					return ELEMENT_ORIGINAL_SCROLL_TO;
				}
				else {
					return elementPrototypeScrollToFallback;
				}
			}
			else {
				return WINDOW_ORIGINAL_SCROLL_TO;
			}
	}
}