const _ = require('lodash');


/**
 * @typedef {object} WriteDimensions
 * @property {number} width width in pixels
 * @property {number} height height in pixels
 * @property {number} rows total rows of letters
 * @property {number} cols total columns of letters
 */

/**
 * 
 * @param {number} w width of drawing area
 * @param {number} l length of string of text
 * @param {number} d dimensions (square) of a letter
 * @return {WriteDimensions}
 */
function getDimensions(w, l, d) {
    let cols = Math.floor(w/d);
    let width = cols * d;
    let rows = (cols > l) ? 1 : Math.floor(l / cols) + (l % cols);
    let height = rows * d;
    return {
        width,
        height,
        rows,
        cols
    }
}

module.exports = getDimensions;