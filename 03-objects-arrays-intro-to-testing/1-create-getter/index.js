/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const str = path.split(".");
  let value;
  return function (obj) {
    function getProp(prop) {
      return value ? value[prop] : obj[prop];
    }
    for (let item of str) {
      value = getProp(item);
    }
    return value;
  };
}
