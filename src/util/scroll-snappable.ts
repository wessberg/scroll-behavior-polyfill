export interface ScrollSnappable extends HTMLElement {
	style: HTMLElement["style"] & {scrollSnapType: string | null};
}
