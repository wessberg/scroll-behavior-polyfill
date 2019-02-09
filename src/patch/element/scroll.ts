import {handleScrollMethod} from "../shared";

/**
 * Patches the 'scroll' method on the Element prototype
 */
export function patchElementScroll(): void {
	Element.prototype.scroll = function(this: Element, optionsOrX?: number | ScrollToOptions, y?: number): void {
		handleScrollMethod(this, "scroll", optionsOrX, y);
	};
}
