import {UNSUPPORTED_ENVIRONMENT} from "../../support/unsupported-environment";

export const ELEMENT_ORIGINAL_SCROLL_TO = UNSUPPORTED_ENVIRONMENT ? undefined : Element.prototype.scrollTo;
