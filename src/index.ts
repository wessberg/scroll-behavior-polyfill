import {SUPPORTS_SCROLL_BEHAVIOR} from "./support/supports-scroll-behavior";
import {patch} from "./patch/patch";

if (!SUPPORTS_SCROLL_BEHAVIOR) {
	patch();
}
