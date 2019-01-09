/**
 * The majority of this file is based on https://github.com/stipsan/compute-scroll-into-view (MIT license),
 * but has been rewritten to accept a scroller as an argument.
 */

// tslint:disable

interface IVisualViewport {
	height: number;
	width: number;
}

declare var visualViewport: IVisualViewport;

declare global {
	interface Window {
		visualViewport?: {
			height: number;
			width: number;
		};
	}
}

/**
 * Find out which edge to align against when logical scroll position is "nearest"
 * Interesting fact: "nearest" works similarly to "if-needed", if the element is fully visible it will not scroll it
 *
 * Legends:
 * ┌────────┐ ┏ ━ ━ ━ ┓
 * │ target │   frame
 * └────────┘ ┗ ━ ━ ━ ┛
 */
function alignNearest (
	scrollingEdgeStart: number,
	scrollingEdgeEnd: number,
	scrollingSize: number,
	scrollingBorderStart: number,
	scrollingBorderEnd: number,
	elementEdgeStart: number,
	elementEdgeEnd: number,
	elementSize: number
) {
	/**
	 * If element edge A and element edge B are both outside scrolling box edge A and scrolling box edge B
	 *
	 *          ┌──┐
	 *        ┏━│━━│━┓
	 *          │  │
	 *        ┃ │  │ ┃        do nothing
	 *          │  │
	 *        ┗━│━━│━┛
	 *          └──┘
	 *
	 *  If element edge C and element edge D are both outside scrolling box edge C and scrolling box edge D
	 *
	 *    ┏ ━ ━ ━ ━ ┓
	 *   ┌───────────┐
	 *   │┃         ┃│        do nothing
	 *   └───────────┘
	 *    ┗ ━ ━ ━ ━ ┛
	 */
	if (
		(elementEdgeStart < scrollingEdgeStart &&
			elementEdgeEnd > scrollingEdgeEnd) ||
		(elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd)
	) {
		return 0;
	}

	/**
	 * If element edge A is outside scrolling box edge A and element height is less than scrolling box height
	 *
	 *          ┌──┐
	 *        ┏━│━━│━┓         ┏━┌━━┐━┓
	 *          └──┘             │  │
	 *  from  ┃      ┃     to  ┃ └──┘ ┃
	 *
	 *        ┗━ ━━ ━┛         ┗━ ━━ ━┛
	 *
	 * If element edge B is outside scrolling box edge B and element height is greater than scrolling box height
	 *
	 *        ┏━ ━━ ━┓         ┏━┌━━┐━┓
	 *                           │  │
	 *  from  ┃ ┌──┐ ┃     to  ┃ │  │ ┃
	 *          │  │             │  │
	 *        ┗━│━━│━┛         ┗━│━━│━┛
	 *          │  │             └──┘
	 *          │  │
	 *          └──┘
	 *
	 * If element edge C is outside scrolling box edge C and element width is less than scrolling box width
	 *
	 *       from                 to
	 *    ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
	 *  ┌───┐                 ┌───┐
	 *  │ ┃ │       ┃         ┃   │     ┃
	 *  └───┘                 └───┘
	 *    ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
	 *
	 * If element edge D is outside scrolling box edge D and element width is greater than scrolling box width
	 *
	 *       from                 to
	 *    ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
	 *        ┌───────────┐   ┌───────────┐
	 *    ┃   │     ┃     │   ┃         ┃ │
	 *        └───────────┘   └───────────┘
	 *    ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
	 */
	if (
		(elementEdgeStart <= scrollingEdgeStart && elementSize <= scrollingSize) ||
		(elementEdgeEnd >= scrollingEdgeEnd && elementSize >= scrollingSize)
	) {
		return elementEdgeStart - scrollingEdgeStart - scrollingBorderStart;
	}

	/**
	 * If element edge B is outside scrolling box edge B and element height is less than scrolling box height
	 *
	 *        ┏━ ━━ ━┓         ┏━ ━━ ━┓
	 *
	 *  from  ┃      ┃     to  ┃ ┌──┐ ┃
	 *          ┌──┐             │  │
	 *        ┗━│━━│━┛         ┗━└━━┘━┛
	 *          └──┘
	 *
	 * If element edge A is outside scrolling box edge A and element height is greater than scrolling box height
	 *
	 *          ┌──┐
	 *          │  │
	 *          │  │             ┌──┐
	 *        ┏━│━━│━┓         ┏━│━━│━┓
	 *          │  │             │  │
	 *  from  ┃ └──┘ ┃     to  ┃ │  │ ┃
	 *                           │  │
	 *        ┗━ ━━ ━┛         ┗━└━━┘━┛
	 *
	 * If element edge C is outside scrolling box edge C and element width is greater than scrolling box width
	 *
	 *           from                 to
	 *        ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
	 *  ┌───────────┐           ┌───────────┐
	 *  │     ┃     │   ┃       │ ┃         ┃
	 *  └───────────┘           └───────────┘
	 *        ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
	 *
	 * If element edge D is outside scrolling box edge D and element width is less than scrolling box width
	 *
	 *           from                 to
	 *        ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
	 *                ┌───┐             ┌───┐
	 *        ┃       │ ┃ │       ┃     │   ┃
	 *                └───┘             └───┘
	 *        ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
	 *
	 */
	if (
		(elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize) ||
		(elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize)
	) {
		return elementEdgeEnd - scrollingEdgeEnd + scrollingBorderEnd;
	}

	return 0;
}

export function computeScrollIntoView (target: Element, scroller: Element, options: ScrollIntoViewOptions): Pick<ScrollToOptions, "top"|"left"> {
	const {
		block,
		inline
	} = options;

	// Used to handle the top most element that can be scrolled
	const scrollingElement = document.scrollingElement || document.documentElement;

	// Support pinch-zooming properly, making sure elements scroll into the visual viewport
	// Browsers that don't support visualViewport will report the layout viewport dimensions on document.documentElement.clientWidth/Height
	// and viewport dimensions on window.innerWidth/Height
	// https://www.quirksmode.org/mobile/viewports2.html
	// https://bokand.github.io/viewport/index.html
	const viewportWidth = window.visualViewport != null
		? visualViewport.width
		: innerWidth;
	const viewportHeight = window.visualViewport != null
		? visualViewport.height
		: innerHeight;

	const viewportX = window.scrollX != null ? window.scrollX : window.pageXOffset;
	const viewportY = window.scrollY != null ? window.scrollY : window.pageYOffset;

	const {
		height: targetHeight,
		width: targetWidth,
		top: targetTop,
		right: targetRight,
		bottom: targetBottom,
		left: targetLeft
	} = target.getBoundingClientRect();

	// These values mutate as we loop through and generate scroll coordinates
	const targetBlock: number =
		block === "start" || block === "nearest"
			? targetTop
			: block === "end"
			? targetBottom
			: targetTop + targetHeight / 2; // block === 'center
	const targetInline: number =
		inline === "center"
			? targetLeft + targetWidth / 2
			: inline === "end"
			? targetRight
			: targetLeft; // inline === 'start || inline === 'nearest

	const {
		height,
		width,
		top,
		right,
		bottom,
		left
	} = scroller.getBoundingClientRect();

	const frameStyle = getComputedStyle(scroller);
	const borderLeft = parseInt(frameStyle.borderLeftWidth as string, 10);
	const borderTop = parseInt(frameStyle.borderTopWidth as string, 10);
	const borderRight = parseInt(frameStyle.borderRightWidth as string, 10);
	const borderBottom = parseInt(frameStyle.borderBottomWidth as string, 10);

	let blockScroll: number = 0;
	let inlineScroll: number = 0;

	// The property existance checks for offset[Width|Height] is because only HTMLElement objects have them, but any Element might pass by here
	// @TODO find out if the "as HTMLElement" overrides can be dropped
	const scrollbarWidth =
		"offsetWidth" in scroller
			? (scroller as HTMLElement).offsetWidth -
			(scroller as HTMLElement).clientWidth -
			borderLeft -
			borderRight
			: 0;
	const scrollbarHeight =
		"offsetHeight" in scroller
			? (scroller as HTMLElement).offsetHeight -
			(scroller as HTMLElement).clientHeight -
			borderTop -
			borderBottom
			: 0;

	if (scrollingElement === scroller) {
		// Handle viewport logic (document.documentElement or document.body)

		if (block === "start") {
			blockScroll = targetBlock;
		}
		else if (block === "end") {
			blockScroll = targetBlock - viewportHeight;
		}
		else if (block === "nearest") {
			blockScroll = alignNearest(
				viewportY,
				viewportY + viewportHeight,
				viewportHeight,
				borderTop,
				borderBottom,
				viewportY + targetBlock,
				viewportY + targetBlock + targetHeight,
				targetHeight
			);
		}
		else {
			// block === 'center' is the default
			blockScroll = targetBlock - viewportHeight / 2;
		}

		if (inline === "start") {
			inlineScroll = targetInline;
		}
		else if (inline === "center") {
			inlineScroll = targetInline - viewportWidth / 2;
		}
		else if (inline === "end") {
			inlineScroll = targetInline - viewportWidth;
		}
		else {
			// inline === 'nearest' is the default
			inlineScroll = alignNearest(
				viewportX,
				viewportX + viewportWidth,
				viewportWidth,
				borderLeft,
				borderRight,
				viewportX + targetInline,
				viewportX + targetInline + targetWidth,
				targetWidth
			);
		}

		// Apply scroll position offsets and ensure they are within bounds
		// @TODO add more test cases to cover this 100%
		blockScroll = Math.max(0, blockScroll + viewportY);
		inlineScroll = Math.max(0, inlineScroll + viewportX);
	}
	else {
		// Handle each scrolling frame that might exist between the target and the viewport

		if (block === "start") {
			blockScroll = targetBlock - top - borderTop;
		}
		else if (block === "end") {
			blockScroll = targetBlock - bottom + borderBottom + scrollbarHeight;
		}
		else if (block === "nearest") {
			blockScroll = alignNearest(
				top,
				bottom,
				height,
				borderTop,
				borderBottom + scrollbarHeight,
				targetBlock,
				targetBlock + targetHeight,
				targetHeight
			);
		}
		else {
			// block === 'center' is the default
			blockScroll = targetBlock - (top + height / 2) + scrollbarHeight / 2;
		}

		if (inline === "start") {
			inlineScroll = targetInline - left - borderLeft;
		}
		else if (inline === "center") {
			inlineScroll = targetInline - (left + width / 2) + scrollbarWidth / 2;
		}
		else if (inline === "end") {
			inlineScroll = targetInline - right + borderRight + scrollbarWidth;
		}
		else {
			// inline === 'nearest' is the default
			inlineScroll = alignNearest(
				left,
				right,
				width,
				borderLeft,
				borderRight + scrollbarWidth,
				targetInline,
				targetInline + targetWidth,
				targetWidth
			);
		}

		const {scrollLeft, scrollTop} = scroller;
		// Ensure scroll coordinates are not out of bounds while applying scroll offsets
		blockScroll = Math.max(
			0,
			Math.min(
				scrollTop + blockScroll,
				scroller.scrollHeight - height + scrollbarHeight
			)
		);
		inlineScroll = Math.max(
			0,
			Math.min(
				scrollLeft + inlineScroll,
				scroller.scrollWidth - width + scrollbarWidth
			)
		);
	}

	return {
		top: blockScroll,
		left: inlineScroll
	};
}