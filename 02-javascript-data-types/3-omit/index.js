/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const helpArray = [];
  Object.entries(obj).find((item) => {
    const [key] = item;
    if (!fields.includes(key)) {
      helpArray.push(item);
    }
  });
  return Object.fromEntries(helpArray);
};
