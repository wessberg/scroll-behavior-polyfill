import {handleScrollMethod} from "../shared";

/**
 * Patches the 'scrollBy' method on the Window prototype
 */
export function patchWindowScrollBy(): void {
	window.scrollBy = function(this: Window | undefined, optionsOrX?: number | ScrollToOptions, y?: number): void {
		handleScrollMethod(this ?? window, "scrollBy", optionsOrX, y);
	};
}
