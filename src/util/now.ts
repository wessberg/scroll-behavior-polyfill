/**
 * Returns a High Resolution timestamp if possible, otherwise fallbacks to Date.now()
 * @returns {number}
 */
export function now (): number {
	if ("performance" in window) return performance.now();
	return Date.now();
}
