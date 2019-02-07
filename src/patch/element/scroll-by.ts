import { handleScrollMethod } from "../shared";

/**
 * Patches the 'scrollBy' method on the Element prototype
 */
export function patchElementScrollBy(): void {
  Element.prototype.scrollBy = function(
    this: Element,
    optionsOrX?: number | ScrollToOptions,
    y?: number
  ): void {
    handleScrollMethod(this, "scrollBy", optionsOrX, y);
  };
}
