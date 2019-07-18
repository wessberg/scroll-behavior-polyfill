import {UNSUPPORTED_ENVIRONMENT} from "../../support/unsupported-environment";

export const WINDOW_ORIGINAL_SCROLL_TO = UNSUPPORTED_ENVIRONMENT ? undefined : window.scrollTo;
