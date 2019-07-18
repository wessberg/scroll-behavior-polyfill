<!-- SHADOW_SECTION_LOGO_START -->

<div><img alt="Logo" src="https://raw.githubusercontent.com/wessberg/scroll-behavior-polyfill/master/documentation/asset/logo.png" height="60"   /></div>

<!-- SHADOW_SECTION_LOGO_END -->

<!-- SHADOW_SECTION_DESCRIPTION_SHORT_START -->

> A polyfill for the 'scroll-behavior' CSS-property

<!-- SHADOW_SECTION_DESCRIPTION_SHORT_END -->

<!-- SHADOW_SECTION_BADGES_START -->

<a href="https://npmcharts.com/compare/scroll-behavior-polyfill?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/scroll-behavior-polyfill.svg"    /></a>
<a href="https://www.npmjs.com/package/scroll-behavior-polyfill"><img alt="NPM version" src="https://badge.fury.io/js/scroll-behavior-polyfill.svg"    /></a>
<a href="https://david-dm.org/wessberg/scroll-behavior-polyfill"><img alt="Dependencies" src="https://img.shields.io/david/wessberg%2Fscroll-behavior-polyfill.svg"    /></a>
<a href="https://github.com/wessberg/scroll-behavior-polyfill/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/wessberg%2Fscroll-behavior-polyfill.svg"    /></a>
<a href="https://github.com/prettier/prettier"><img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"    /></a>
<a href="https://opensource.org/licenses/MIT"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"    /></a>
<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Support on Patreon" src="https://img.shields.io/badge/patreon-donate-green.svg"    /></a>

<!-- SHADOW_SECTION_BADGES_END -->

<!-- SHADOW_SECTION_DESCRIPTION_LONG_START -->

## Description

<!-- SHADOW_SECTION_DESCRIPTION_LONG_END -->

The [`scroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) CSS-property as well as the extensions to the Element interface in the [CSSOM View Module](https://drafts.csswg.org/cssom-view/#dom-element-scrollto-options-options) CSS property sets the behavior for a scrolling box when scrolling is triggered by the navigation or CSSOM scrolling APIs.
This polyfill brings this new feature to all browsers.

It is very efficient, tiny, and works with the latest browser technologies such as Shadow DOM.

This polyfill also implements the extensions to the Element interface in the [CSSOM View Module](https://drafts.csswg.org/cssom-view/#dom-element-scrollto-options-options) such as `Element.prototype.scroll`, `Element.prototype.scrollTo`, `Element.protype.scrollBy`, and `Element.prototype.scrollIntoView`.

<!-- SHADOW_SECTION_FEATURES_START -->

### Features

<!-- SHADOW_SECTION_FEATURES_END -->

- Spec-compliant
- Tiny
- Efficient
- Works with the latest browser technologies, including Shadow DOM
- Seamless

<!-- SHADOW_SECTION_FEATURE_IMAGE_START -->

<!-- SHADOW_SECTION_FEATURE_IMAGE_END -->

<!-- SHADOW_SECTION_TOC_START -->

## Table of Contents

- [Description](#description)
  - [Features](#features)
- [Table of Contents](#table-of-contents)
- [Install](#install)
  - [NPM](#npm)
  - [Yarn](#yarn)
- [Applying the polyfill](#applying-the-polyfill)
- [Usage](#usage)
  - [Declarative API](#declarative-api)
  - [Imperative API](#imperative-api)
- [Dependencies & Browser support](#dependencies--browser-support)
- [Contributing](#contributing)
- [Maintainers](#maintainers)
- [Backers](#backers)
  - [Patreon](#patreon)
- [FAQ](#faq)
  - [Are there any known quirks?](#are-there-any-known-quirks)
- [License](#license)

<!-- SHADOW_SECTION_TOC_END -->

<!-- SHADOW_SECTION_INSTALL_START -->

## Install

### NPM

```
$ npm install scroll-behavior-polyfill
```

### Yarn

```
$ yarn add scroll-behavior-polyfill
```

<!-- SHADOW_SECTION_INSTALL_END -->

## Applying the polyfill

The polyfill will be feature detected and applied if and only if the browser doesn't support the property already.
To include it, add this somewhere:

```typescript
import "scroll-behavior-polyfill";
```

However, it is strongly suggested that you only include the polyfill for browsers that doesn't already support `scroll-behavior`.
One way to do so is with an async import:

```typescript
if (!("scrollBehavior" in document.documentElement.style)) {
	await import("scroll-behavior-polyfill");
}
```

Alternatively, you can use [Polyfill.app](https://github.com/wessberg/Polyfiller) which uses this polyfill and takes care of only loading the polyfill if needed as well as adding the language features that the polyfill depends on (See [dependencies](#dependencies--browser-support)).

<!-- SHADOW_SECTION_USAGE_START -->

## Usage

<!-- SHADOW_SECTION_USAGE_END -->

### Declarative API

You can define the `scroll-behavior` of Elements via one of the following approaches:

- A style attribute including a `scroll-behavior` property.
- An element with a `scroll-behavior` attribute.
- Or, an element with a `CSSStyleDeclaration` with a `scrollBehavior` property.

This means that either of the following approaches will work:

```html
<!-- Works just fine when given in the 'style' attribute -->
<div style="scroll-behavior: smooth"></div>
<!-- Works just fine when given as an attribute of the name 'scroll-behavior' -->
<div scroll-behavior="smooth"></div>

<script>
	// Works jut fine when given as a style property
	element.style.scrollBehavior = "smooth";
</script>
```

See [this section](#are-there-any-known-quirks) for information about why `scroll-behavior` values provided in stylesheets won't be discovered by the polyfill.

### Imperative API

You can of course also use the imperative `scroll()`, `scrollTo`, `scrollBy`, and `scrollIntoView` APIs and provide `scroll-behavior` options.

For example:

```typescript
// Works for the window object
window.scroll({
	behavior: "smooth",
	top: 100,
	left: 0
});

// Works for any element (and supports all options)
myElement.scrollIntoView();

myElement.scrollBy({
	behavior: "smooth",
	top: 50,
	left: 0
});
```

You can also use the `scrollTop` and `scrollLeft` setters, both of which works with the polyfill too:

```typescript
element.scrollTop += 100;
element.scrollLeft += 50;
```

## Dependencies & Browser support

This polyfill is distributed in ES3-compatible syntax, but is using some modern APIs and language features which must be available:

- `requestAnimationFrame`
- `Object.getOwnPropertyDescriptor`
- `Object.defineProperty`

For by far the most browsers, these features will already be natively available.
Generally, I would highly recommend using something like [Polyfill.app](https://github.com/wessberg/Polyfiller) which takes care of this stuff automatically.

<!-- SHADOW_SECTION_CONTRIBUTING_START -->

## Contributing

Do you want to contribute? Awesome! Please follow [these recommendations](./CONTRIBUTING.md).

<!-- SHADOW_SECTION_CONTRIBUTING_END -->

<!-- SHADOW_SECTION_MAINTAINERS_START -->

## Maintainers

| <img alt="Frederik Wessberg" src="https://avatars2.githubusercontent.com/u/20454213?s=460&v=4" height="70"   />                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Frederik Wessberg](mailto:frederikwessberg@hotmail.com)<br><strong>Twitter</strong>: [@FredWessberg](https://twitter.com/FredWessberg)<br>_Lead Developer_ |

<!-- SHADOW_SECTION_MAINTAINERS_END -->

<!-- SHADOW_SECTION_BACKERS_START -->

## Backers

### Patreon

[Become a backer](https://www.patreon.com/bePatron?u=11315442) and get your name, avatar, and Twitter handle listed here.

<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Backers on Patreon" src="https://patreon-badge.herokuapp.com/11315442.png"  width="500"  /></a>

<!-- SHADOW_SECTION_BACKERS_END -->

<!-- SHADOW_SECTION_FAQ_START -->

## FAQ

<!-- SHADOW_SECTION_FAQ_END -->

### Are there any known quirks?

- `scroll-behavior` properties declared only in stylesheets won't be discovered. This is because [polyfilling CSS is hard and really bad for performance](https://philipwalton.com/articles/the-dark-side-of-polyfilling-css/).

<!-- SHADOW_SECTION_LICENSE_START -->

## License

MIT © [Frederik Wessberg](mailto:frederikwessberg@hotmail.com) ([@FredWessberg](https://twitter.com/FredWessberg)) ([Website](https://github.com/wessberg))

<!-- SHADOW_SECTION_LICENSE_END -->
