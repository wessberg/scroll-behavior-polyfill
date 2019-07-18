import {ScrollSnappable} from "../../util/scroll-snappable";

export interface ISmoothScrollOptions {
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	startTime: number;
	scroller: ScrollSnappable;
	method(x: number, y: number): void;
}
