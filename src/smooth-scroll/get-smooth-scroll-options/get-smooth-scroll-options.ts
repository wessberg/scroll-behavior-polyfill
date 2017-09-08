import {ISmoothScrollOptions} from "../smooth-scroll-options/i-smooth-scroll-options";
import {updateScrollPosition} from "../../update-scroll-position/update-scroll-position";
import {now} from "../../util/now";

/**
 * Gets the Smooth Scroll Options to use for the step function
 * @param {HTMLElement|Window} element
 * @param {number} x
 * @param {number} y
 * @param {Function} originalFunction
 * @returns {ISmoothScrollOptions}
 */
export function getSmoothScrollOptions (element: HTMLElement|Window, x: number, y: number, originalFunction: Function): ISmoothScrollOptions {
	const startTime = now();

	if (!(element instanceof Element)) {
		// Use window as the scroll container
		const {scrollX, pageXOffset, scrollY, pageYOffset} = window;
		return {
			element: window,
			startX: scrollX == null || scrollX === 0 ? pageXOffset : scrollX,
			startY: scrollY == null || scrollY === 0 ? pageYOffset : scrollY,
			method: originalFunction,
			startTime,
			x,
			y
		};
	}

	else {
		const {scrollLeft, scrollTop} = element;
		return {
			element,
			startX: scrollLeft,
			startY: scrollTop,
			x,
			y,
			startTime,
			method: updateScrollPosition.bind(element, element)
		};
	}
}
