/**
 * Ensures that the given value is numeric
 * @param {number} value
 * @return {number}
 */
export function ensureNumeric(value: unknown): number {
	if (value == null) return 0;
	else if (typeof value === "number") {
		return value;
	} else if (typeof value === "string") {
		return parseFloat(value);
	} else {
		return 0;
	}
}
