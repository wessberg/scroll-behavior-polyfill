/**
 * Returns true if the given value is some ScrollToOptions
 * @param {number | ScrollToOptions} value
 * @return {value is ScrollToOptions}
 */
export function isScrollToOptions(
  value: number | ScrollToOptions | undefined
): value is ScrollToOptions {
  return value != null && typeof value === "object";
}
