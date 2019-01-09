import {getParent} from "./get-parent";
import {getScrollBehavior} from "./get-scroll-behavior";

/**
 * Finds the nearest ancestor of an element that can scroll
 * @param {Element} target
 * @returns {Element|Window?}
 */
export function findNearestAncestorsWithScrollBehavior (target: Element|HTMLElement): undefined|[Element|HTMLElement, ScrollBehavior] {
	let currentElement: Element|HTMLElement = target;
	while (currentElement != null) {
		const behavior = getScrollBehavior(currentElement);
		if (behavior != null) return [currentElement, behavior];

		const parent = getParent(currentElement);
		// If the last Node is equal to the latest parentNode, break immediately
		if (parent === currentElement) break;
		currentElement = parent as Element;
	}
	return undefined;
}