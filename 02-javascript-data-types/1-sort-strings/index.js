/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  function sortStr(a, b) {
    return a.localeCompare(b, ["ang-u-kf-upper", "ru-u-kf-upper"], {
      sensitivity: "variant",
    });
  }
  return arr.slice().sort((a, b) => {
    if (param === "asc") {
      return sortStr(a, b);
    }
    return sortStr(b, a);
  });
}
