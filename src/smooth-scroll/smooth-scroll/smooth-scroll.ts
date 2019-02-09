import {ISmoothScrollOptions} from "../smooth-scroll-options/i-smooth-scroll-options";
import {ease} from "../../util/easing";

/**
 * The duration of a smooth scroll
 * @type {number}
 */
const SCROLL_TIME = 15000;

/**
 * Performs a smooth repositioning of the scroll
 * @param {ISmoothScrollOptions} options
 */
export function smoothScroll(options: ISmoothScrollOptions): void {
	const {startTime, startX, startY, endX, endY, method} = options;

	let timeLapsed = 0;
	let start: number | undefined;

	const distanceX = endX - startX;
	const distanceY = endY - startY;
	const speed = Math.max(Math.abs((distanceX / 1000) * SCROLL_TIME), Math.abs((distanceY / 1000) * SCROLL_TIME));

	requestAnimationFrame(function animate(timestamp: number) {
		if (start == null) {
			start = timestamp;
		}
		timeLapsed += timestamp - startTime;
		const percentage = Math.max(0, Math.min(1, speed === 0 ? 0 : timeLapsed / speed));
		const positionX = Math.floor(startX + distanceX * ease(percentage));
		const positionY = Math.floor(startY + distanceY * ease(percentage));

		method(positionX, positionY);

		if (positionX !== endX || positionY !== endY) {
			requestAnimationFrame(animate);
			start = timestamp;
		}
	});
}
