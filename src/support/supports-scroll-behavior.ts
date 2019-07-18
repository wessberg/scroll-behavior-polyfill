import {UNSUPPORTED_ENVIRONMENT} from "./unsupported-environment";

/**
 * Is true if the browser natively supports the 'scroll-behavior' CSS-property.
 * @type {boolean}
 */
export const SUPPORTS_SCROLL_BEHAVIOR = UNSUPPORTED_ENVIRONMENT ? false : "scrollBehavior" in document.documentElement.style;
