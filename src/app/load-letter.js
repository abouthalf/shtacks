const _ = require('lodash'),
    letters = require('./letters.js');

/**
 * Load an image by letter or name
 * 
 * @param {string} letter 
 * @param {function} callback 
 * @returns {HTMLImageElement|void}
 */
function loadLetter(letter, callback) {
    let src,
        chosen,
        img;
    // randomly select a colored space block
    if ([' ', '_space', 'space'].indexOf(letter) > -1) {
        let spaces = letters._space,
            n = spaces.length,
            i =_.random(0, --n);
        chosen = spaces[i];
    } else if (!_.isUndefined(letters[letter])) {
        chosen = letters[letter];
    }

    if (chosen) {
        src = `img/${chosen}`;
        img = new Image();
        if (_.isFunction(callback)) {
            img.addEventListener('load', callback);
        }
        img.src = src;
        return img;
    }
    
}

module.exports = loadLetter;