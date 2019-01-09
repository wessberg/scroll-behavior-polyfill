import {patchElementScroll} from "./element/scroll";
import {patchElementScrollBy} from "./element/scroll-by";
import {patchElementScrollTo} from "./element/scroll-to";
import {patchWindowScroll} from "./window/scroll";
import {patchWindowScrollBy} from "./window/scroll-by";
import {patchWindowScrollTo} from "./window/scroll-to";
import {catchNavigation} from "./anchor/catch-navigation";
import {patchElementScrollIntoView} from "./element/scroll-into-view";

/**
 * Applies the polyfill
 */
export function patch (): void {
	patchElementScroll();
	patchElementScrollBy();
	patchElementScrollTo();
	patchElementScrollIntoView();

	patchWindowScroll();
	patchWindowScrollBy();
	patchWindowScrollTo();

	catchNavigation();
}
