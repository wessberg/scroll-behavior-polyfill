import {handleScrollMethod} from "../shared";
import {ELEMENT_ORIGINAL_SCROLL_TOP_SET_DESCRIPTOR} from "../../original/element/scroll-top";

/**
 * Patches the 'scrollTop' property descriptor on the Element prototype
 */
export function patchElementScrollTop(): void {
	Object.defineProperty(Element.prototype, "scrollTop", {
		set(scrollTop: number) {
			if (this.__adjustingScrollPosition) {
				return ELEMENT_ORIGINAL_SCROLL_TOP_SET_DESCRIPTOR!.call(this, scrollTop);
			}

			handleScrollMethod(this, "scrollTo", this.scrollLeft, scrollTop);
			return scrollTop;
		}
	});
}
