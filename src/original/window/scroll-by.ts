import {UNSUPPORTED_ENVIRONMENT} from "../../support/unsupported-environment";

export const WINDOW_ORIGINAL_SCROLL_BY = UNSUPPORTED_ENVIRONMENT ? undefined : window.scrollBy;
