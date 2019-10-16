/**
 * Gets the origin of the given Location or HTMLAnchorElement if available in the runtime, and otherwise shims it. (it's a one-liner)
 * @returns {string}
 */
export function getLocationOrigin(locationLike: Location | HTMLAnchorElement = location): string {
	if ("origin" in locationLike && locationLike.origin != null) {
		return locationLike.origin;
	}

	let port = locationLike.port != null && locationLike.port.length > 0 ? `:${locationLike.port}` : "";

	if (locationLike.protocol === "http:" && port === ":80") {
		port = "";
	} else if (locationLike.protocol === "https:" && port === ":443") {
		port = "";
	}

	return `${locationLike.protocol}//${locationLike.hostname}${port}`;
}
