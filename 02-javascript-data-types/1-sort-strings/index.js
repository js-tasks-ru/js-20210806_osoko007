/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  return arr.slice().sort((a, b) =>
    param === "asc"
      ? a.localeCompare(b, ["ang-u-kf-upper", "ru-u-kf-upper"], {
          sensitivity: "variant",
        })
      : b.localeCompare(a, ["ang-u-kf-upper", "ru-u-kf-upper"], {
          sensitivity: "variant",
        })
  );
}
