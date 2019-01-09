import {findNearestAncestorsWithScrollBehavior} from "../../util/find-nearest-ancestor-with-scroll-behavior";
import {findNearestRoot} from "../../util/find-nearest-root";

/**
 * A Regular expression that matches id's of the form "#[digit]"
 * @type {RegExp}
 */
const ID_WITH_LEADING_DIGIT_REGEXP = /^#\d/;

/**
 * Catches anchor navigation to IDs within the same root and ensures that they can be smooth-scrolled
 * if the scroll behavior is smooth in the first rooter within that context
 */
export function catchNavigation (): void {
	// Listen for 'click' events globally
	window.addEventListener("click", e => {
		// Only work with trusted events on HTMLAnchorElements
		if (!e.isTrusted || !(e.target instanceof HTMLAnchorElement)) return;
		const hrefAttributeValue = e.target.getAttribute("href");

		// Only work with HTMLAnchorElements that navigates to a specific ID
		if (hrefAttributeValue == null || !hrefAttributeValue.startsWith("#")) return;

		// Find the nearest ancestor that can be scrolled
		const ancestorWithScrollBehaviorResult = findNearestAncestorsWithScrollBehavior(e.target);
		// If there is none, don't proceed
		if (ancestorWithScrollBehaviorResult == null) return;

		// Take the scroll behavior for that ancestor
		const [ancestorWithScrollBehavior, behavior] = ancestorWithScrollBehaviorResult;

		// If the behavior isn't smooth, don't proceed
		if (behavior !== "smooth") return;

		// Find the nearest root, whether it be a ShadowRoot or the document itself
		const root = findNearestRoot(e.target);

		// Attempt to match the selector from that root. querySelector' doesn't support IDs that start with a digit, so work around that limitation
		const elementMatch = hrefAttributeValue.match(ID_WITH_LEADING_DIGIT_REGEXP) != null
			? root.getElementById(hrefAttributeValue.slice(1))
			: root.querySelector(hrefAttributeValue);

		// If no selector could be found, don't proceed
		if (elementMatch == null) return;

		// Otherwise, first prevent the default action.
		e.preventDefault();

		// Now, scroll to the element with that ID
		ancestorWithScrollBehavior.scrollTo({
			behavior,
			top: (elementMatch as HTMLElement).offsetTop,
			left: (elementMatch as HTMLElement).offsetLeft
		});
	});
}