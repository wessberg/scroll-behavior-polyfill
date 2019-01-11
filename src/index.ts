import {SUPPORTS_SCROLL_BEHAVIOR} from "./support/supports-scroll-behavior";
import {patch} from "./patch/patch";
import {SUPPORTS_ELEMENT_PROTOTYPE_SCROLL_METHODS} from "./support/supports-element-prototype-scroll-methods";

if (!SUPPORTS_SCROLL_BEHAVIOR || !SUPPORTS_ELEMENT_PROTOTYPE_SCROLL_METHODS) {
	patch();
}
