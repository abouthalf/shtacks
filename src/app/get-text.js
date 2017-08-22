const replaceGlyphs = require('./replace-glyphs');
const smartquotes = require('smartquotes');

let lastText = "";

/**
 * @typedef {object} TextState A container object with the current text state
 * @property {string} previous Previous complete text state
 * @property {string} current Current complete text state
 */

/**
 * Given an input element, extract the text value. 
 * Store the current value so it can be re
 * @param {HTMLInputElement} input 
 * @returns {TextState}
 */
function getText(input) {
    // capture
    let currentText = smartquotes(replaceGlyphs(input.value).toUpperCase()),
        previousText = lastText;

    // set lastText to current
    lastText = currentText;
    
    return {
        previous: previousText,
        current: currentText
    }
}

module.exports = getText;