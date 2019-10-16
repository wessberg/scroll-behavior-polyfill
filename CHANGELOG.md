## [2.0.13](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.12...v2.0.13) (2019-10-16)

### Features

- **compatibility:** Support IE 11. [#4](https://github.com/wessberg/scroll-behavior-polyfill/issues/4) ([71089d7](https://github.com/wessberg/scroll-behavior-polyfill/commit/71089d72a3bded13d9cd47d749028666490fa62d))

## [2.0.12](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.11...v2.0.12) (2019-09-09)

### Bug Fixes

- anchor detection if the link also contains a path fails. Closes [#9](https://github.com/wessberg/scroll-behavior-polyfill/issues/9) ([4b14f30](https://github.com/wessberg/scroll-behavior-polyfill/commit/4b14f309d6b243850f71aeed82e0698f7cd786ad))

## [2.0.11](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.10...v2.0.11) (2019-08-12)

### Bug Fixes

- **declarations:** marks declarations as a module to help with async imports. Closes [#8](https://github.com/wessberg/scroll-behavior-polyfill/issues/8) ([ac1e99e](https://github.com/wessberg/scroll-behavior-polyfill/commit/ac1e99eee72db6525fe0b7f7bf6df2723ca08a81))

## [2.0.10](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.9...v2.0.10) (2019-07-18)

### Bug Fixes

- **bug:** makes it possible to use the polyfill without native WeakMap support ([012b486](https://github.com/wessberg/scroll-behavior-polyfill/commit/012b486b4f79559a5b2bfb7fc2e861144d927040))

## [2.0.9](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.8...v2.0.9) (2019-07-18)

### Bug Fixes

- **bug:** fixes an issue when using this polyfill along with css-scroll-snap. Closes [#5](https://github.com/wessberg/scroll-behavior-polyfill/issues/5) ([c50582b](https://github.com/wessberg/scroll-behavior-polyfill/commit/c50582b3a4d64e8621e05ce247dc8199c2a5c5dd)), closes [#7](https://github.com/wessberg/scroll-behavior-polyfill/issues/7)

## [2.0.8](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.7...v2.0.8) (2019-06-21)

### Bug Fixes

- **typings:** fixes issue that would lead to Typescript errors due to global namespace annotations ([75fd236](https://github.com/wessberg/scroll-behavior-polyfill/commit/75fd236b4e80b2eba9f56ef4029f2e7f108f06bb))

## [2.0.7](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.6...v2.0.7) (2019-02-23)

### Bug Fixes

- **bug:** fixes an issue where anchor scrolling could lead to the wrong coordinates under some circumstances ([2f399f4](https://github.com/wessberg/scroll-behavior-polyfill/commit/2f399f4243f5cea82cc7d291f74fd689ab771f81))

## [2.0.6](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.5...v2.0.6) (2019-02-09)

## [2.0.5](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.4...v2.0.5) (2019-02-07)

## [2.0.4](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.3...v2.0.4) (2019-01-24)

### Bug Fixes

- **package.json:** updates 'engine' field to reflect support for older Node.js versions. Fixes [#3](https://github.com/wessberg/scroll-behavior-polyfill/issues/3) ([8b49156](https://github.com/wessberg/scroll-behavior-polyfill/commit/8b4915634292f94c6a7a2bab5cf867283c3ae215))

## [2.0.3](https://github.com/wessberg/scroll-behavior-polyfill/compare/2.0.3...v2.0.3) (2019-01-11)

## [2.0.2](https://github.com/wessberg/scroll-behavior-polyfill/compare/v2.0.1...v2.0.2) (2019-01-11)

### Features

- **improvements:** Bug fixes, support for scrolling via the scrollTop and scrollLeft setters, and more ([4989d15](https://github.com/wessberg/scroll-behavior-polyfill/commit/4989d15ef53196e8619a161211214e412bbd09bc))

## [2.0.1](https://github.com/wessberg/scroll-behavior-polyfill/compare/2.0.1...v2.0.1) (2019-01-09)

# [2.0.0](https://github.com/wessberg/scroll-behavior-polyfill/compare/v1.0.2...v2.0.0) (2019-01-09)

### Features

- **release:** new major version and rewritten from scratch. ([5647eb3](https://github.com/wessberg/scroll-behavior-polyfill/commit/5647eb3fc041d613f2ce8290c8a7733ca081ca8b))

### BREAKING CHANGES

- **release:** CSS Stylesheets will no longer be parsed. Instead, you must either set inline styles, an attribute with the same name, or set it imperatively. Of course, you can still use the imperative API.

## [1.0.2](https://github.com/wessberg/scroll-behavior-polyfill/compare/v1.0.1...v1.0.2) (2017-09-08)

## 1.0.1 (2017-09-08)
