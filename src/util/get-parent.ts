// tslint:disable:no-any

/**
 * Gets the parent of an element, taking into account DocumentFragments, ShadowRoots, as well as the root context (window)
 * @param {EventTarget} currentElement
 * @returns {EventTarget | null}
 */
export function getParent(
  currentElement: EventTarget
): Element | Window | Node | null {
  if ("nodeType" in currentElement && (<Node>currentElement).nodeType === 1) {
    return (<Node>currentElement).parentNode;
  }

  if (
    "ShadowRoot" in window &&
    currentElement instanceof (<any>window).ShadowRoot
  ) {
    return (<ShadowRoot>currentElement).host;
  } else if (currentElement === document) {
    return window;
  } else if (currentElement instanceof Node) return currentElement.parentNode;

  return null;
}
