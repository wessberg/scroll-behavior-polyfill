import {getParent} from "./get-parent";

// tslint:disable:no-any

/**
 * Finds the nearest root from an element
 * @param {Element} target
 * @returns {Document|ShadowRoot}
 */
export function findNearestRoot(target: Element): Document | ShadowRoot {
	let currentElement: EventTarget | null = target;
	while (currentElement != null) {
		if ("ShadowRoot" in window && currentElement instanceof (window as any).ShadowRoot) {
			// Assume this is a ShadowRoot
			return currentElement as ShadowRoot;
		}

		const parent = getParent(currentElement);

		if (parent === currentElement) {
			return document;
		}

		currentElement = parent;
	}
	return document;
}
