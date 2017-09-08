import {disposeElement, disposeElements} from "../dispose/dispose";
import {registerElement, registerElements} from "../register/register";
import {getScrollBehavior} from "../util/get-scroll-behavior";
import {ScrollBehaviorKind} from "../scroll-behavior-kind/scroll-behavior-kind";

/**
 * How often to check for elements with a 'scroll-behavior' CSS property
 * @type {number}
 */
const PROPERTY_CHECK_INTERVAL = 3000;

/**
 * How long to wait before tracking for the first time
 * @type {number}
 */
const INIT_DELAY = 300;

/**
 * The elements that are currently being tracked where 'scroll-behavior' is set as a style property
 * @type {Set<HTMLElement>}
 */
const TRACKED_PROPERTY_ELEMENTS: Set<HTMLElement> = new Set();

/**
 * Starts tracking elements with a 'scroll-behavior' CSS property
 */
export function startTracking (): void {
	track();
}

/**
 * Tracks all elements with a 'scroll-behavior' CSS property.
 * Waits for the browser to become idle
 */
function track (): void {
	setTimeout(trackElements, INIT_DELAY);
}

/**
 * Tracks all elements. Some of this is by selectors, some of this is by watching CSS property values set imperatively
 */
function trackElements (): void {
	trackSelectors();
	startTrackingInlineProperties();
	trackInlineProperties();
}

/**
 * Registers an interval to track inline properties
 */
function startTrackingInlineProperties (): void {
	setInterval(trackInlineProperties, PROPERTY_CHECK_INTERVAL);
}

/**
 * Tracks inline properties
 */
function trackInlineProperties (): void {
	const all = Array.from(document.querySelectorAll("*"));
	const filtered = new Set<HTMLElement>(<HTMLElement[]>all.filter(node => node instanceof HTMLElement && getScrollBehavior(node) === ScrollBehaviorKind.SMOOTH));

	// Check if a tracked element should be disposed (e.g. lost the property value in the meantime)
	TRACKED_PROPERTY_ELEMENTS.forEach(trackedElement => {
		if (!filtered.has(trackedElement)) {
			TRACKED_PROPERTY_ELEMENTS.delete(trackedElement);
			disposeElement(trackedElement);
		}
	});

	// Add new tracked elements from the filtered ones
	filtered.forEach(filteredElement => {
		if (!TRACKED_PROPERTY_ELEMENTS.has(filteredElement)) {
			TRACKED_PROPERTY_ELEMENTS.add(filteredElement);
			registerElement(filteredElement);
		}
	});
}

/**
 * Finds all elements with a 'scroll-behavior' CSS-property. Wraps all of them and unwraps all elements that
 * has been previously wrapped but since lost their 'scroll-behavior' CSS-property
 */
function trackSelectors (): void {
	window.Polyfill({
		keywords: {
			declarations: ["scroll-behavior: *"]
		}
	})
		.doMatched(rules => registerElements(getSelectorsForCSSMatch(rules)))
		.undoUnmatched(rules => disposeElements(getSelectorsForCSSMatch(rules)));
}

/**
 * Gets all selectors for a CSS match
 * @param {PolyfillRuleSet} rules
 * @returns {string[]}
 */
function getSelectorsForCSSMatch (rules: PolyfillRuleSet): string[] {
	const candidates: string[] = [];
	rules.each(rule => {
		const declaration = rule.getDeclaration();
		if (declaration["scroll-behavior"] === ScrollBehaviorKind.SMOOTH) {
			candidates.push(rule.getSelectors());
		}
	});
	return candidates;
}