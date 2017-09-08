import {ISmoothScrollOptions} from "../smooth-scroll-options/i-smooth-scroll-options";
import {ease} from "../../util/easing";
import {now} from "../../util/now";

/**
 * The duration of a smooth scroll
 * @type {number}
 */
const SCROLL_TIME = 200;

/**
 * Performs a smooth repositioning of the scroll
 * @param {ISmoothScrollOptions} options
 */
export function smoothScroll (options: ISmoothScrollOptions): void {
	const {startTime, startX, startY, x, y, method, element} = options;
	const currentTime = now();
	let value;
	let currentX;
	let currentY;
	let elapsed = (currentTime - startTime) / SCROLL_TIME;

	// avoid elapsed times higher than one
	elapsed = elapsed > 1 ? 1 : elapsed;

	// apply easing to elapsed time
	value = ease(elapsed);

	currentX = startX + (x - startX) * value;
	currentY = startY + (y - startY) * value;

	method.call(element, currentX, currentY);

	// scroll more if we have not reached our destination
	if (currentX !== x || currentY !== y) {
		requestAnimationFrame(() => smoothScroll(options));
	}
}
