import { getParent } from "./get-parent";
import { getScrollBehavior } from "./get-scroll-behavior";

const scrollingElement =
  document.scrollingElement != null
    ? document.scrollingElement
    : document.documentElement;

/**
 * Returns true if the given overflow property represents a scrollable overflow value
 * @param {string | null} overflow
 * @return {boolean}
 */
function canOverflow(overflow: string | null): boolean {
  return overflow !== "visible" && overflow !== "clip";
}

/**
 * Returns true if the given element is scrollable
 * @param {Element} element
 * @return {boolean}
 */
function isScrollable(element: Element) {
  if (
    element.clientHeight < element.scrollHeight ||
    element.clientWidth < element.scrollWidth
  ) {
    const style = getComputedStyle(element, null);
    return canOverflow(style.overflowY) || canOverflow(style.overflowX);
  }

  return false;
}

/**
 * Finds the nearest ancestor of an element that can scroll
 * @param {Element} target
 * @returns {Element|Window?}
 */
export function findNearestAncestorsWithScrollBehavior(
  target: Element | HTMLElement
): [Element | HTMLElement, ScrollBehavior] {
  let currentElement: Element | HTMLElement = target;

  while (currentElement != null) {
    const behavior = getScrollBehavior(currentElement);
    if (
      behavior != null &&
      (currentElement === scrollingElement || isScrollable(currentElement))
    ) {
      return [currentElement, behavior];
    }

    const parent = getParent(currentElement);
    currentElement = parent as Element;
  }

  // No such element could be found. Start over, but this time find the nearest ancestor that can simply scroll
  currentElement = target;

  while (currentElement != null) {
    if (currentElement === scrollingElement || isScrollable(currentElement)) {
      return [currentElement, "auto"];
    }

    const parent = getParent(currentElement);
    currentElement = parent as Element;
  }

  // Default to the scrolling element
  return [scrollingElement, "auto"];
}
