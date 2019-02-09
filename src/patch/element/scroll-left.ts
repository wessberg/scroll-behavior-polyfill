import {handleScrollMethod} from "../shared";
import {ELEMENT_ORIGINAL_SCROLL_LEFT_SET_DESCRIPTOR} from "../../original/element/scroll-left";

/**
 * Patches the 'scrollLeft' property descriptor on the Element prototype
 */
export function patchElementScrollLeft(): void {
	Object.defineProperty(Element.prototype, "scrollLeft", {
		set(scrollLeft: number) {
			if (this.__adjustingScrollPosition) {
				return ELEMENT_ORIGINAL_SCROLL_LEFT_SET_DESCRIPTOR.call(this, scrollLeft);
			}

			handleScrollMethod(this, "scrollTo", scrollLeft, this.scrollTop);
			return scrollLeft;
		}
	});
}
