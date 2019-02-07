import { findNearestAncestorsWithScrollBehavior } from "../../util/find-nearest-ancestor-with-scroll-behavior";
import { ELEMENT_ORIGINAL_SCROLL_INTO_VIEW } from "../../original/element/scroll-into-view";
import { computeScrollIntoView } from "./compute-scroll-into-view";
import { getOriginalScrollMethodForKind } from "../../scroll-method/get-original-scroll-method-for-kind";

/**
 * Patches the 'scrollIntoView' method on the Element prototype
 */
export function patchElementScrollIntoView(): void {
  Element.prototype.scrollIntoView = function(
    this: Element,
    arg?: boolean | ScrollIntoViewOptions
  ): void {
    const normalizedOptions: ScrollIntoViewOptions =
      arg == null || arg === true
        ? {
            block: "start",
            inline: "nearest"
          }
        : arg === false
        ? {
            block: "end",
            inline: "nearest"
          }
        : arg;

    // Find the nearest ancestor that can be scrolled
    const [
      ancestorWithScroll,
      ancestorWithScrollBehavior
    ] = findNearestAncestorsWithScrollBehavior(this);

    const behavior =
      normalizedOptions.behavior != null
        ? normalizedOptions.behavior
        : ancestorWithScrollBehavior;

    // If the behavior isn't smooth, simply invoke the original implementation and do no more
    if (behavior !== "smooth") {
      // Assert that 'scrollIntoView' is actually defined
      if (ELEMENT_ORIGINAL_SCROLL_INTO_VIEW != null) {
        ELEMENT_ORIGINAL_SCROLL_INTO_VIEW.call(this, normalizedOptions);
      }

      // Otherwise, invoke 'scrollTo' instead and provide the scroll coordinates
      else {
        const { top, left } = computeScrollIntoView(
          this,
          ancestorWithScroll,
          normalizedOptions
        );
        getOriginalScrollMethodForKind("scrollTo", this).call(this, left, top);
      }
      return;
    }

    ancestorWithScroll.scrollTo({
      behavior,
      ...computeScrollIntoView(this, ancestorWithScroll, normalizedOptions)
    });
  };
}
