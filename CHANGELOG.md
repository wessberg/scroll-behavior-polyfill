## [2.0.11](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.10...v2.0.11) (2019-08-12)

### Bug Fixes

- **declarations:** marks declarations as a module to help with async imports. Closes [#8](https://github.com/wessberg/scroll-behavior-polyfill/issues/8) ([ac1e99e](https://github.com/wessberg/scroll-behavior-polyfill/commit/ac1e99e))

## [2.0.10](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.9...v2.0.10) (2019-07-18)

### Bug Fixes

- **bug:** makes it possible to use the polyfill without native WeakMap support ([012b486](https://github.com/wessberg/scroll-behavior-polyfill/commit/012b486))

## [2.0.9](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.8...v2.0.9) (2019-07-18)

### Bug Fixes

- **bug:** fixes an issue when using this polyfill along with css-scroll-snap. Closes [#5](https://github.com/wessberg/scroll-behavior-polyfill/issues/5) ([c50582b](https://github.com/wessberg/scroll-behavior-polyfill/commit/c50582b)), closes [#7](https://github.com/wessberg/scroll-behavior-polyfill/issues/7)

## [2.0.8](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.7...v2.0.8) (2019-06-21)

### Bug Fixes

- **typings:** fixes issue that would lead to Typescript errors due to global namespace annotations ([75fd236](https://github.com/wessberg/scroll-behavior-polyfill/commit/75fd236))

## [2.0.7](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.6...v2.0.7) (2019-02-23)

### Bug Fixes

- **bug:** fixes an issue where anchor scrolling could lead to the wrong coordinates under some circumstances ([2f399f4](https://github.com/wessberg/scroll-behavior-polyfill/commit/2f399f4))

## [2.0.6](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.5...v2.0.6) (2019-02-09)

## [2.0.5](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.4...v2.0.5) (2019-02-07)

## [2.0.4](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.3...v2.0.4) (2019-01-24)

### Bug Fixes

- **package.json:** updates 'engine' field to reflect support for older Node.js versions. Fixes [#3](https://github.com/wessberg/scroll-behavior-polyfill/issues/3) ([8b49156](https://github.com/wessberg/scroll-behavior-polyfill/commit/8b49156))

## [2.0.3](https://github.com/wessberg/scroll-behavior-polyfill/compare/2.0.3...v2.0.3) (2019-01-11)

## [2.0.2](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.1...v2.0.2) (2019-01-11)

### Features

- **improvements:** Bug fixes, support for scrolling via the scrollTop and scrollLeft setters, and more ([4989d15](https://github.com/wessberg/scroll-behavior-polyfill/commit/4989d15))

## [2.0.1](https://github.com/wessberg/scroll-behavior-polyfill/compare/2.0.1...v2.0.1) (2019-01-09)

# [2.0.0](https://github.com/wessberg/scroll-behavior-polyfill/compare/v1.0.2...v2.0.0) (2019-01-09)

### Features

- **release:** new major version and rewritten from scratch. ([5647eb3](https://github.com/wessberg/scroll-behavior-polyfill/commit/5647eb3))

### BREAKING CHANGES

- **release:** CSS Stylesheets will no longer be parsed. Instead, you must either set inline styles, an attribute with the same name, or set it imperatively. Of course, you can still use the imperative API.

## [1.0.2](https://github.com/wessberg/scroll-behavior-polyfill/compare/v1.0.1...v1.0.2) (2017-09-08)

## 1.0.1 (2017-09-08)
