import {UNSUPPORTED_ENVIRONMENT} from "../../support/unsupported-environment";

const s = Object.getOwnPropertyDescriptor(Element.prototype, "scrollTop");
export const ELEMENT_ORIGINAL_SCROLL_TOP_SET_DESCRIPTOR = UNSUPPORTED_ENVIRONMENT || typeof s === "undefined" ? undefined : s!.set!;
