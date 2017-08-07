const _ = require('lodash');

/**
 * ❤
 */
const heart = "\u2764";
const placeholdersToUnicode = {
    ":heart:": heart,
    "_heart": heart,
    "_heart_": heart,
    "<3": heart
};

/**
 * Replace glyph placeholders like :heart: with their unicode equivalent
 * @param {string} text 
 * @return string
 */
function replaceGlyphs(text) {
    _.forEach(_.keys(placeholdersToUnicode), placeholder => {
        let r = new RegExp(placeholder, 'gi');
        text = text.replace(r, placeholdersToUnicode[placeholder]);
    })
    return text;
}

module.exports = replaceGlyphs;