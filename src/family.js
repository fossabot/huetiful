/**
 * @typedef { import('../types/types.js').HueFamily}HueFamily
 * @typedef { import('../types/types.js').ColorToken} ColorToken
 */
import hue from './maps/hue.js';
import { customConcat, lt, max, entries } from './fp/index.js';
import { get } from './get.js';

/**
 * Gets the hue family which a color belongs to with the overtone included (if it has one.).
 * 
 * For example `'red'` or `'blue-green'`. If the color is achromatic it returns the string `'gray'`.
 * @param {ColorToken} color The color to query its shade or hue family.
 * @returns {HueFamily}
 * @example
 *
 * import { family } from 'huetiful-js'


console.log(family("#310000"))
// 'red'
 */
function family(color) {
  var [k, v] = ['', Infinity];
  for (let [i, b] of entries(hue)) {
    var [p, y, u] = [
      customConcat(b),
      get(`lch.h`)(color),
      Math.abs(max(p) - y)
    ];
    if (lt(u, v)) {
      k = i;
    }
  }

  // @ts-ignore
  return k;
}

export { family };
