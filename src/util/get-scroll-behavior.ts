import {ScrollBehaviorKind} from "../scroll-behavior-kind/scroll-behavior-kind";

/**
 * Get the current scroll behavior of an HTMLElement
 * @param {HTMLElement} element
 * @returns {ScrollBehaviorKind}
 */
export function getScrollBehavior (element: HTMLElement): ScrollBehaviorKind {
	let val: string|null = null;

	// First, check as an attribute
	const attribute = element.getAttribute("style");
	if (attribute != null) {
		// Find the position within the string where 'scroll-behavior' is declare (if it is).
		const indexOfScrollBehavior = attribute.indexOf("scroll-behavior");

		if (indexOfScrollBehavior >= 0) {
			// Check where it ends. If it never sees a ';', it is the last (or only) style property of the string
			const endIndexOfScrollBehavior = attribute.indexOf(";", indexOfScrollBehavior);
			// Slice the attribute value from after the ':' sign and up until the next ';' (or to the end if it is the last or only style property)
			val = attribute.slice(indexOfScrollBehavior + "scroll-behavior:".length, endIndexOfScrollBehavior < 0 ? undefined : endIndexOfScrollBehavior).trim();
		}
	}

	// If 'val' is still null, no match was found as an inline-style
	if (val == null) {
		/*tslint:disable*/
		val = (<any>element.style).scrollBehavior;
		/*tslint:enable*/
	}

	/*tslint:enable:no-any*/
	return val === ScrollBehaviorKind.SMOOTH ? ScrollBehaviorKind.SMOOTH : ScrollBehaviorKind.AUTO;
}
