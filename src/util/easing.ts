const HALF = 0.5;

/**
 * The easing function to use when applying the smooth scrolling
 * @param {number} k
 * @returns {number}
 */
export function ease(k: number) {
	return HALF * (1 - Math.cos(Math.PI * k));
}
