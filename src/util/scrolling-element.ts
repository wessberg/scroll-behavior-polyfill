export function getScrollingElement(): HTMLElement {
	if (document.scrollingElement != null) {
		return document.scrollingElement as HTMLElement;
	} else {
		return document.documentElement;
	}
}
