import {SUPPORTS_SCROLL_BEHAVIOR} from "./support/supports-scroll-behavior";
import {patch} from "./patch/patch";
import {SUPPORTS_ELEMENT_PROTOTYPE_SCROLL_METHODS} from "./support/supports-element-prototype-scroll-methods";
import {UNSUPPORTED_ENVIRONMENT} from "./support/unsupported-environment";

if (!UNSUPPORTED_ENVIRONMENT && (!SUPPORTS_SCROLL_BEHAVIOR || !SUPPORTS_ELEMENT_PROTOTYPE_SCROLL_METHODS)) {
	patch();
}
