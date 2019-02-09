const styleDeclarationPropertyName = "scrollBehavior" as keyof CSSStyleDeclaration;
const styleAttributePropertyName = "scroll-behavior";
const styleAttributePropertyNameRegex = new RegExp(`${styleAttributePropertyName}:\\s*([^;]*)`);
export type ScrollBehaviorRawValue = ScrollBehavior | null | "";

/**
 * Determines the scroll behavior to use, depending on the given ScrollOptions and the position of the Element
 * within the DOM
 * @param {Element|HTMLElement|Window} inputTarget
 * @param {ScrollOptions} [options]
 * @returns {ScrollBehavior}
 */
export function getScrollBehavior(inputTarget: Element | HTMLElement | Window, options?: ScrollOptions): ScrollBehavior | undefined {
	// If the given 'behavior' is 'smooth', apply smooth scrolling no matter what
	if (options != null && options.behavior === "smooth") return "smooth";

	const target: HTMLElement = "style" in inputTarget ? inputTarget : document.scrollingElement != null ? (document.scrollingElement as HTMLElement) : document.documentElement;

	let value: ScrollBehavior | undefined;

	if ("style" in target) {
		// Check if scroll-behavior is set as a property on the CSSStyleDeclaration
		const scrollBehaviorPropertyValue = target.style[styleDeclarationPropertyName] as ScrollBehaviorRawValue;
		// Return it if it is given and has a proper value
		if (scrollBehaviorPropertyValue != null && scrollBehaviorPropertyValue !== "") {
			value = scrollBehaviorPropertyValue;
		}
	}

	if (value == null) {
		const attributeValue = target.getAttribute("scroll-behavior");
		if (attributeValue != null && attributeValue !== "") {
			value = attributeValue as ScrollBehavior;
		}
	}

	if (value == null) {
		// Otherwise, check if it is set as an inline style
		const styleAttributeValue = target.getAttribute("style");
		if (styleAttributeValue != null && styleAttributeValue.includes(styleAttributePropertyName)) {
			const match = styleAttributeValue.match(styleAttributePropertyNameRegex);
			if (match != null) {
				const [, behavior] = match;
				if (behavior != null && behavior !== "") {
					value = behavior as ScrollBehavior;
				}
			}
		}
	}

	if (value == null) {
		// Take the computed style for the element and see if it contains a specific 'scroll-behavior' value
		const computedStyle = getComputedStyle(target);
		const computedStyleValue = computedStyle.getPropertyValue("scrollBehavior") as ScrollBehaviorRawValue;
		if (computedStyleValue != null && computedStyleValue !== "") {
			value = computedStyleValue;
		}
	}

	// In all other cases, use the value from the CSSOM
	return value;
}
