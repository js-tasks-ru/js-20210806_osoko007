/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    let newArr = arr.slice()
    if (param === 'asc') {
        return newArr.sort((a,b)=>a.localeCompare(b, ['ang-u-kf-upper', 'ru-u-kf-upper'], { sensitivity: 'variant' }))
    } else if (param === 'desc') {
        return newArr.sort((a,b)=>b.localeCompare(a, ['ang-u-kf-upper', 'ru-u-kf-upper'], { sensitivity: 'variant' }))
    }
}
