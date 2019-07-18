import {ScrollSnappable} from "./scroll-snappable";
import {SUPPORTS_SCROLL_BEHAVIOR} from "../support/supports-scroll-behavior";
import {appendScrollBehaviorToStyleAttribute, parseScrollBehaviorFromStyleAttribute} from "./attribute";
import {getScrollingElement} from "./scrolling-element";

export interface DisableScrollSnapResult {
	reset(): void;
}

export interface DisableScrollSnapReleaser {
	cachedScrollSnapValue: string | null;
	cachedScrollBehaviorStyleAttributeValue: ScrollBehavior | undefined;
	secondaryScroller: ScrollSnappable | undefined;
	secondaryScrollerCachedScrollSnapValue: string | null | undefined;
	secondaryScrollerCachedScrollBehaviorStyleAttributeValue: ScrollBehavior | undefined;
	release(): void;
}

const NOOP: DisableScrollSnapResult = {
	reset: () => {}
};

const map = typeof WeakMap === "undefined" ? undefined : new WeakMap<ScrollSnappable, DisableScrollSnapReleaser>();

export function disableScrollSnap(scroller: ScrollSnappable): DisableScrollSnapResult {
	// If scroll-behavior is natively supported, or if there is no native WeakMap support, there's no need for this fix
	if (SUPPORTS_SCROLL_BEHAVIOR || map == null) {
		return NOOP;
	}

	const scrollingElement = getScrollingElement();

	let cachedScrollSnapValue: string | null;
	let cachedScrollBehaviorStyleAttributeValue: ScrollBehavior | undefined;
	let secondaryScroller: ScrollSnappable | undefined;
	let secondaryScrollerCachedScrollSnapValue: string | null | undefined;
	let secondaryScrollerCachedScrollBehaviorStyleAttributeValue: ScrollBehavior | undefined;
	const existingResult = map.get(scroller);
	if (existingResult != null) {
		cachedScrollSnapValue = existingResult.cachedScrollSnapValue;
		cachedScrollBehaviorStyleAttributeValue = existingResult.cachedScrollBehaviorStyleAttributeValue;
		secondaryScroller = existingResult.secondaryScroller;
		secondaryScrollerCachedScrollSnapValue = existingResult.secondaryScrollerCachedScrollSnapValue;
		secondaryScrollerCachedScrollBehaviorStyleAttributeValue = existingResult.secondaryScrollerCachedScrollBehaviorStyleAttributeValue;
		existingResult.release();
	} else {
		cachedScrollSnapValue = scroller.style.scrollSnapType === "" ? null : scroller.style.scrollSnapType;
		cachedScrollBehaviorStyleAttributeValue = parseScrollBehaviorFromStyleAttribute(scroller);
		secondaryScroller = scroller === scrollingElement && scrollingElement !== document.body ? (document.body as ScrollSnappable) : undefined;
		secondaryScrollerCachedScrollSnapValue =
			secondaryScroller == null ? undefined : secondaryScroller.style.scrollSnapType === "" ? null : secondaryScroller.style.scrollSnapType;
		secondaryScrollerCachedScrollBehaviorStyleAttributeValue =
			secondaryScroller == null ? undefined : parseScrollBehaviorFromStyleAttribute(secondaryScroller);

		const cachedComputedScrollSnapValue = getComputedStyle(scroller).getPropertyValue("scroll-snap-type");
		const secondaryScrollerCachedComputedScrollSnapValue =
			secondaryScroller == null ? undefined : getComputedStyle(secondaryScroller).getPropertyValue("scroll-snap-type");

		// If it just so happens that there actually isn't any scroll snapping going on, there's no point in performing any additional work here.
		if (cachedComputedScrollSnapValue === "none" && secondaryScrollerCachedComputedScrollSnapValue === "none") {
			return NOOP;
		}
	}

	scroller.style.scrollSnapType = "none";
	if (secondaryScroller !== undefined) {
		secondaryScroller.style.scrollSnapType = "none";
	}
	if (cachedScrollBehaviorStyleAttributeValue !== undefined) {
		appendScrollBehaviorToStyleAttribute(scroller, cachedScrollBehaviorStyleAttributeValue);
	}

	if (secondaryScroller !== undefined && secondaryScrollerCachedScrollBehaviorStyleAttributeValue !== undefined) {
		appendScrollBehaviorToStyleAttribute(secondaryScroller, secondaryScrollerCachedScrollBehaviorStyleAttributeValue);
	}

	let hasReleased = false;

	const eventTarget = scroller === scrollingElement ? window : scroller;

	function release() {
		eventTarget.removeEventListener("scroll", resetHandler);
		if (map != null) {
			map.delete(scroller);
		}
		hasReleased = true;
	}

	function resetHandler() {
		scroller.style.scrollSnapType = cachedScrollSnapValue;

		if (secondaryScroller != null && secondaryScrollerCachedScrollSnapValue !== undefined) {
			secondaryScroller.style.scrollSnapType = secondaryScrollerCachedScrollSnapValue;
		}

		if (cachedScrollBehaviorStyleAttributeValue !== undefined) {
			appendScrollBehaviorToStyleAttribute(scroller, cachedScrollBehaviorStyleAttributeValue);
		}

		if (secondaryScroller !== undefined && secondaryScrollerCachedScrollBehaviorStyleAttributeValue !== undefined) {
			appendScrollBehaviorToStyleAttribute(secondaryScroller, secondaryScrollerCachedScrollBehaviorStyleAttributeValue);
		}

		release();
	}

	function reset() {
		setTimeout(() => {
			if (hasReleased) return;
			eventTarget.addEventListener("scroll", resetHandler);
		});
	}

	map.set(scroller, {
		release,
		cachedScrollSnapValue,
		cachedScrollBehaviorStyleAttributeValue,
		secondaryScroller,
		secondaryScrollerCachedScrollSnapValue,
		secondaryScrollerCachedScrollBehaviorStyleAttributeValue
	});

	return {
		reset
	};
}
