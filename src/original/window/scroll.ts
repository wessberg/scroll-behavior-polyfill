import {UNSUPPORTED_ENVIRONMENT} from "../../support/unsupported-environment";

export const WINDOW_ORIGINAL_SCROLL = UNSUPPORTED_ENVIRONMENT ? undefined : window.scroll;
