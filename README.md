# `scroll-behavior` polyfill
[![NPM version][npm-version-image]][npm-version-url]
[![License-mit][license-mit-image]][license-mit-url]

[license-mit-url]: https://opensource.org/licenses/MIT

[license-mit-image]: https://img.shields.io/badge/License-MIT-yellow.svg

[npm-version-url]: https://www.npmjs.com/package/scroll-behavior-polyfill

[npm-version-image]: https://badge.fury.io/js/scroll-behavior-polyfill.svg

> A polyfill for the new CSS property: `scroll-behavior`.

## Installation

You can `npm install` it like this:
```
npm install scroll-behavior-polyfill
```

## Adding the polyfill

### Importing it

The polyfill will be feature detected and applied if and only if the browser doesn't support the property already.
To include it, add this somewhere:

```typescript
import "scroll-behavior-polyfill"
```

### Conditionally importing it

Preferably, you should feature detect before including the code since there is no need to include a polyfill that won't ever be applied.

One way to do so is with async imports:

```typescript
if (!"scrollBehavior" in document.documentElement.style) {
	await import("scroll-behavior-polyfill");
}
```

## Usage

You can use scroll-behavior exactly how you expect to:

### As a CSS-property

```css
#something {
	scroll-behavior: smooth
}
```

### As an inline-style

```html
<div style="scroll-behavior: smooth"></div>
```

### As an imperative style property

```typescript
element.style.scrollBehavior = "smooth";
```

## Dependencies

This polyfill expects `requestAnimationFrame` to be defined.
Please polyfill it!

## Caveats

- You cannot set `scrollLeft` or `scrollTop`. There is no way to overwrite the property descriptors for those operations. Instead, use `scroll()`, `scrollTo` or `scrollBy` which does the exact same thing.
- `Element.scrollIntoView()` is not polyfilled at the moment.
- Elements inside ShadowRoots won't be detected at the moment. It probably will be soon.