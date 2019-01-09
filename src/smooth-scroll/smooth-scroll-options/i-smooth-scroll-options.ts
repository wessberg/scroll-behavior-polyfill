export interface ISmoothScrollOptions {
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	startTime: number;
	method (x: number, y: number): void;
}
