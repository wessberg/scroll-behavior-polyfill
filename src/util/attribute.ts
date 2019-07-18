const STYLE_ATTRIBUTE_PROPERTY_NAME = "scroll-behavior";
const STYLE_ATTRIBUTE_PROPERTY_REGEXP = new RegExp(`${STYLE_ATTRIBUTE_PROPERTY_NAME}:\\s*([^;]*)`);

/**
 * Given an Element, this function appends the given ScrollBehavior CSS property value to the elements' 'style' attribute.
 * If it doesnt already have one, it will add it.
 * @param {Element} element
 * @param {ScrollBehavior} behavior
 */
export function appendScrollBehaviorToStyleAttribute(element: Element, behavior: ScrollBehavior): void {
	const addition = `${STYLE_ATTRIBUTE_PROPERTY_NAME}:${behavior}`;
	let attributeValue = element.getAttribute("style");
	if (attributeValue == null || attributeValue === "") {
		element.setAttribute("style", addition);
		return;
	}

	// The style attribute may already include a 'scroll-behavior:<something>' in which case that should be replaced
	const existingValueForProperty = parseScrollBehaviorFromStyleAttribute(element);
	if (existingValueForProperty != null) {
		const replacementProperty = `${STYLE_ATTRIBUTE_PROPERTY_NAME}:${existingValueForProperty}`;
		// Replace the variant that ends with a semi-colon which it may
		attributeValue = attributeValue.replace(`${replacementProperty};`, "");
		// Replace the variant that *doesn't* end with a semi-colon
		attributeValue = attributeValue.replace(replacementProperty, "");
	}

	// Now, append the behavior to the string.
	element.setAttribute("style", attributeValue.endsWith(";") ? `${attributeValue}${addition}` : `;${attributeValue}${addition}`);
}

/**
 * Given an Element, this function attempts to parse its 'style' attribute (if it has one)' to extract
 * a value for the 'scroll-behavior' CSS property (if it is given within that style attribute)
 * @param {Element} element
 * @returns {ScrollBehavior?}
 */
export function parseScrollBehaviorFromStyleAttribute(element: Element): ScrollBehavior | undefined {
	const styleAttributeValue = element.getAttribute("style");
	if (styleAttributeValue != null && styleAttributeValue.includes(STYLE_ATTRIBUTE_PROPERTY_NAME)) {
		const match = styleAttributeValue.match(STYLE_ATTRIBUTE_PROPERTY_REGEXP);
		if (match != null) {
			const [, behavior] = match;
			if (behavior != null && behavior !== "") {
				return behavior as ScrollBehavior;
			}
		}
	}
	return undefined;
}
