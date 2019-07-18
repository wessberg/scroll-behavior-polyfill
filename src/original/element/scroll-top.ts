import {UNSUPPORTED_ENVIRONMENT} from "../../support/unsupported-environment";

export const ELEMENT_ORIGINAL_SCROLL_TOP_SET_DESCRIPTOR = UNSUPPORTED_ENVIRONMENT
	? undefined
	: Object.getOwnPropertyDescriptor(Element.prototype, "scrollTop")!.set!;
