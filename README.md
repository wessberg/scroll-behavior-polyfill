<a href="https://npmcharts.com/compare/scroll-behavior-polyfill?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/scroll-behavior-polyfill.svg" height="20"></img></a>
<a href="https://david-dm.org/scroll-behavior-polyfill"><img alt="Dependencies" src="https://img.shields.io/david/scroll-behavior-polyfill.svg" height="20"></img></a>
<a href="https://www.npmjs.com/package/scroll-behavior-polyfill"><img alt="NPM Version" src="https://badge.fury.io/js/scroll-behavior-polyfill.svg" height="20"></img></a>
<a href="https://github.com/wessberg/scroll-behavior-polyfill/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/wessberg%2Fscroll-behavior-polyfill.svg" height="20"></img></a>
<a href="https://opensource.org/licenses/MIT"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-yellow.svg" height="20"></img></a>
<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Support on Patreon" src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" height="20"></img></a>

# `scroll-behavior-polyfill`

> A polyfill for the [`scroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) CSS-property as well as the extensions to the Element interface in the [CSSOM View Module](https://drafts.csswg.org/cssom-view/#dom-element-scrollto-options-options)

## Description

The `scroll-behavior` CSS property sets the behavior for a scrolling box when scrolling is triggered by the navigation or CSSOM scrolling APIs.
This polyfill brings this new feature to all browsers.

It is very efficient, tiny, and works with the latest browser technologies such as Shadow DOM.

This polyfill also implements the extensions to the Element interface in the [CSSOM View Module](https://drafts.csswg.org/cssom-view/#dom-element-scrollto-options-options) such as `Element.prototype.scroll`, `Element.prototype.scrollTo`, `Element.protype.scrollBy`, and `Element.prototype.scrollIntoView`.

## Install

### NPM

```
$ npm install scroll-behavior-polyfill
```

### Yarn

```
$ yarn add scroll-behavior-polyfill
```

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

## Usage

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

## Contributing

Do you want to contribute? Awesome! Please follow [these recommendations](./CONTRIBUTING.md).

## Maintainers

- <a href="https://github.com/wessberg"><img alt="Frederik Wessberg" src="https://avatars2.githubusercontent.com/u/20454213?s=460&v=4" height="11"></img></a> [Frederik Wessberg](https://github.com/wessberg): _Maintainer_

## FAQ

### Are there any known quirks?

- `scroll-behavior` properties declared only in stylesheets won't be discovered. This is because [polyfilling CSS is hard and really bad for performance](https://philipwalton.com/articles/the-dark-side-of-polyfilling-css/).

## Backers 🏅

[Become a backer](https://www.patreon.com/bePatron?u=11315442) and get your name, logo, and link to your site listed here.

## License 📄

MIT © [Frederik Wessberg](https://github.com/wessberg)
