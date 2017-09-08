export interface ISmoothScrollOptions {
	startX: number;
	startY: number;
	startTime: number;
	x: number;
	y: number;
	element: HTMLElement|Window;
	method: Function;
}
