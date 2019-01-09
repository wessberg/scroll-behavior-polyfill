import {findNearestAncestorsWithScrollBehavior} from "../../util/find-nearest-ancestor-with-scroll-behavior";
import {ELEMENT_ORIGINAL_SCROLL_INTO_VIEW} from "../../original/element/scroll-into-view";
import {computeScrollIntoView} from "./compute-scroll-into-view";

/**
 * Patches the 'scrollIntoView' method on the Element prototype
 */
export function patchElementScrollIntoView (): void {

	Element.prototype.scrollIntoView = function (this: Element, arg?: boolean|ScrollIntoViewOptions): void {
		const normalizedOptions: ScrollIntoViewOptions = arg == null || arg === true
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
		const ancestorWithScrollBehaviorResult = findNearestAncestorsWithScrollBehavior(this);

		// If there is none, opt-out by calling the original implementation
		if (ancestorWithScrollBehaviorResult == null) {
			ELEMENT_ORIGINAL_SCROLL_INTO_VIEW.call(this, normalizedOptions);
			return;
		}

		const [ancestorWithScroll, ancestorWithScrollBehavior] = ancestorWithScrollBehaviorResult;
		const behavior = normalizedOptions.behavior != null ? normalizedOptions.behavior : ancestorWithScrollBehavior;

		// If the behavior isn't smooth, simply invoke the original implementation and do no more
		if (behavior !== "smooth") {
			ELEMENT_ORIGINAL_SCROLL_INTO_VIEW.call(this, normalizedOptions);
			return;
		}

		ancestorWithScroll.scrollTo({
			behavior,
			...computeScrollIntoView(this, ancestorWithScroll, normalizedOptions)
		});

	};
}