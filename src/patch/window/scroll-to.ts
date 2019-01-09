import {handleScrollMethod} from "../shared";

/**
 * Patches the 'scrollTo' method on the Window prototype
 */
export function patchWindowScrollTo (): void {

	window.scrollTo = function (this: Window, optionsOrX?: number|ScrollToOptions, y?: number): void {
		handleScrollMethod(this, "scrollTo", optionsOrX, y);
	};
}
