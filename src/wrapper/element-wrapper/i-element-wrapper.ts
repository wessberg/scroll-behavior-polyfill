export interface IElementWrapper {
	scroll: {
		original (options?: ScrollToOptions): void;
		original (x: number, y: number): void;
		wrapped: Function;
	};
	scrollTo: {
		original (options?: ScrollToOptions): void;
		original (x: number, y: number): void;
		wrapped: Function;
	};
	scrollBy: {
		original (options?: ScrollToOptions): void;
		original (x: number, y: number): void;
		wrapped: Function;
	};
}
