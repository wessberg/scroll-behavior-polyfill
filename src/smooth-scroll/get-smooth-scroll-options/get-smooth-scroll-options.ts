import {ISmoothScrollOptions} from "../smooth-scroll-options/i-smooth-scroll-options";
import {now} from "../../util/now";
import {WINDOW_ORIGINAL_SCROLL_TO} from "../../original/window/scroll-to";
import {ELEMENT_ORIGINAL_SCROLL_TO} from "../../original/element/scroll-to";

export type ScrollMethodName = "scroll"|"scrollBy"|"scrollTo";

/**
 * Gets the Smooth Scroll Options to use for the step function
 * @param {Element|Window} element
 * @param {number} x
 * @param {number} y
 * @param {ScrollMethodName} kind
 * @returns {ISmoothScrollOptions}
 */
export function getSmoothScrollOptions (element: Element|Window, x: number, y: number, kind: ScrollMethodName): ISmoothScrollOptions {
	const startTime = now();

	if (!(element instanceof Element)) {
		// Use window as the scroll container
		const {scrollX, pageXOffset, scrollY, pageYOffset} = window;
		const startX = scrollX == null || scrollX === 0 ? pageXOffset : scrollX;
		const startY = scrollY == null || scrollY === 0 ? pageYOffset : scrollY;
		return {
			startTime,
			startX,
			startY,
			endX: Math.floor(kind === "scrollBy"
				? startX + x
				: x),
			endY: Math.floor(kind === "scrollBy"
				? startY + y
				: y),
			method: WINDOW_ORIGINAL_SCROLL_TO.bind(window)
		};
	}

	else {
		const {scrollLeft, scrollTop} = element;
		const startX = scrollLeft;
		const startY = scrollTop;
		return {
			startTime,
			startX,
			startY,
			endX: kind === "scrollBy"
				? startX + x
				: x,
			endY: kind === "scrollBy"
				? startY + y
				: y,
			method: ELEMENT_ORIGINAL_SCROLL_TO.bind(element)
		};
	}
}
