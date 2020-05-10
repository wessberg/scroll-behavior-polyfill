import {handleScrollMethod} from "../shared";

/**
 * Patches the 'scroll' method on the Window prototype
 */
export function patchWindowScroll(): void {
	window.scroll = function(this: Window | undefined, optionsOrX?: number | ScrollToOptions, y?: number): void {
		handleScrollMethod(this ?? window, "scroll", optionsOrX, y);
	};
}
