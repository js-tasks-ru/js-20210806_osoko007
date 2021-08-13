/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const helpArray = [];
  Object.entries(obj).find((item) => {
    const [key] = item;
    if (fields.includes(key)) {
      helpArray.push(item);
    }
  });
  return Object.fromEntries(helpArray);
};
