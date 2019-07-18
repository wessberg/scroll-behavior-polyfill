import {UNSUPPORTED_ENVIRONMENT} from "../../support/unsupported-environment";

export const ELEMENT_ORIGINAL_SCROLL_INTO_VIEW = UNSUPPORTED_ENVIRONMENT ? undefined : Element.prototype.scrollIntoView;
