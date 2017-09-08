/**
 * Is true if the browser natively supports the 'scroll-behavior' CSS-property.
 * @type {boolean}
 */
export const SUPPORTS_SCROLL_BEHAVIOR = "scrollBehavior" in document.documentElement.style;
