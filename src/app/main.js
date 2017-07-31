const _ = require('lodash');
const letters = require('./letters.js');
const loadLetter = require('./load-letter.js');

// Let's just try loading all the pimages first
_.forEach(_.keys(letters), letter => {
    loadLetter(letter, function(event) {
        console.log(this.src);
    });
});

// load letters
    // get initial content
    // sort letters by content
    // for each letter, create an image
    // on load draw letter
// capture input
// draw letters
// get coordinates
// resize

