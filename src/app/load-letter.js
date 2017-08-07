const _ = require('lodash'),
    letters = require('./letters.js');

// Image bucket
let images = {};

/**
 * Load an image by letter or name
 * 
 * @param {string} letter 
 * @param {function} callback called in the scope of the image 
 * @returns {HTMLImageElement|void}
 */
function loadLetter(letter, callback) {
    // sanitize callback
    if (!_.isFunction(callback)) {
        callback = _.noop();
    }

    /*
    if the image has already been cached, 
    return from cache and call the onload function
    */
    if (!_.isUndefined(images[letter])) {
        let img = images[letter];
        callback.apply(img);
        return images[img];
    }

    /*
    if the image has not been cached, load
    and call callback onload.
    */
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
        img.dataset.letter = letter;
        img.addEventListener('load', callback);
        img.src = src;
        return img;
    }
    
}

module.exports = loadLetter;