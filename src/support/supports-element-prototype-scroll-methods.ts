import {UNSUPPORTED_ENVIRONMENT} from "./unsupported-environment";

/**
 * Is true if the browser natively supports the Element.prototype.[scroll|scrollTo|scrollBy|scrollIntoView] methods
 * @type {boolean}
 */
export const SUPPORTS_ELEMENT_PROTOTYPE_SCROLL_METHODS = UNSUPPORTED_ENVIRONMENT
	? false
	: "scroll" in Element.prototype && "scrollTo" in Element.prototype && "scrollBy" in Element.prototype && "scrollIntoView" in Element.prototype;
