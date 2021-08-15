/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return "";
  } else if (!string) {
    return "";
  } else if (string && size) {
    let filterArray = [];
    let newString = string.split("");
    let count = 1;
    newString.map((item, index, array) => {
      if (array[index] === array[index + 1]) {
        if (count < size) {
          ++count;
          filterArray.push(array[index]);
        }
      } else if (array[index] !== array[index + 1]) {
        count = 0;
        ++count;
        filterArray.push(array[index]);
      }
    });
    return filterArray.join("");
  } else if (!size && string) {
    return string;
  }
}
