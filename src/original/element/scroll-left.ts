import {UNSUPPORTED_ENVIRONMENT} from "../../support/unsupported-environment";

export const ELEMENT_ORIGINAL_SCROLL_LEFT_SET_DESCRIPTOR = UNSUPPORTED_ENVIRONMENT
	? undefined
	: Object.getOwnPropertyDescriptor(Element.prototype, "scrollLeft")!.set!;
