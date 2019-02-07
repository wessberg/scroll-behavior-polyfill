import { handleScrollMethod } from "../shared";

/**
 * Patches the 'scrollTo' method on the Element prototype
 */
export function patchElementScrollTo(): void {
  Element.prototype.scrollTo = function(
    this: Element,
    optionsOrX?: number | ScrollToOptions,
    y?: number
  ): void {
    handleScrollMethod(this, "scrollTo", optionsOrX, y);
  };
}
