/**
 * Gets the origin of the given Location or HTMLAnchorElement if available in the runtime, and otherwise shims it. (it's a one-liner)
 * @returns {string}
 */
export function getLocationOrigin(locationLike: Location | HTMLAnchorElement = location): string {
	if ("origin" in locationLike && locationLike.origin != null) {
		return locationLike.origin;
	}

	return `${locationLike.protocol}//${locationLike.hostname}${
		locationLike.port != null && locationLike.port.length > 0 ? ":" + locationLike.port : ""
	}`;
}
