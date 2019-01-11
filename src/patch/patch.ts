import {patchElementScroll} from "./element/scroll";
import {patchElementScrollBy} from "./element/scroll-by";
import {patchElementScrollTo} from "./element/scroll-to";
import {patchWindowScroll} from "./window/scroll";
import {patchWindowScrollBy} from "./window/scroll-by";
import {patchWindowScrollTo} from "./window/scroll-to";
import {catchNavigation} from "./anchor/catch-navigation";
import {patchElementScrollIntoView} from "./element/scroll-into-view";
import {patchElementScrollTop} from "./element/scroll-top";
import {patchElementScrollLeft} from "./element/scroll-left";

/**
 * Applies the polyfill
 */
export function patch (): void {
	// Element.prototype methods
	patchElementScroll();
	patchElementScrollBy();
	patchElementScrollTo();
	patchElementScrollIntoView();

	// Element.prototype descriptors
	patchElementScrollLeft();
	patchElementScrollTop();

	// window methods
	patchWindowScroll();
	patchWindowScrollBy();
	patchWindowScrollTo();

	// Navigation
	catchNavigation();
}
