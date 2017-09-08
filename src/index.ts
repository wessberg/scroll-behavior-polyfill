/**
 * This polyfill makes any browser understand the CSS-property 'scroll-behavior'.
 * For any element with a 'scroll-behavior' CSS property value of 'smooth', any change
 * in its scroll position will render smoothly.
 *
 * DEPENDENCIES
 * - requestAnimationFrame
 *
 * CAVEATS
 * - You cannot set 'scrollLeft' or 'scrollTop'. There is no way to overwrite the property descriptors for those operations. Instead, use 'scroll()', 'scrollTo' or 'scrollBy' which does the exact same thing
 * - Element.scrollIntoView() is not polyfilled at the moment.
 * - Elements inside ShadowRoots won't be detected at the moment.
 */

import "./lib/polyfills";
import {SUPPORTS_SCROLL_BEHAVIOR} from "./support/supports-scroll-behavior";
import {apply} from "./apply/apply";

if (!SUPPORTS_SCROLL_BEHAVIOR) {
	apply();
}
