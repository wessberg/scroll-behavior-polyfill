import {handleScrollMethod} from "../shared";

/**
 * Patches the 'scrollBy' method on the Window prototype
 */
export function patchWindowScrollBy (): void {

	window.scrollBy = function (this: Window, optionsOrX?: number|ScrollToOptions, y?: number): void {
		handleScrollMethod(this, "scrollBy", optionsOrX, y);
	};
}
