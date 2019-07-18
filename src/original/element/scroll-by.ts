import {UNSUPPORTED_ENVIRONMENT} from "../../support/unsupported-environment";

export const ELEMENT_ORIGINAL_SCROLL_BY = UNSUPPORTED_ENVIRONMENT ? undefined : Element.prototype.scrollBy;
