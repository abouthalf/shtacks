const _ = require('lodash'),
    getText = require('./get-text.js'),
    getDimensions = require('./get-dimensions.js'),
    loadLetter = require('./load-letter.js'),
    writeLetter = require('./write-letter.js');

/**
 * Write the text from input into canvas
 * 
 * @param {HTMLInputElement} input 
 * @param {HTMLCanvasElement} canvas 
 */
function write(input, canvas) {
    // get the drawing context
    let ctx = canvas.getContext('2d');
    // get the text
    let textState = getText(input);
    // get window width
    let width = document.documentElement.clientWidth;
    // let's pick a square dimension for our letters
    let square = width >= 600 ? 150 : 75; 
    // calculate canvas size from text
    let l = textState.current.length
    let dimensions = getDimensions(width, l, square);
    // clear and resize canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    // create a table of letters to load
    let table = _.chunk(textState.current.split(''), dimensions.cols);
    _.forEach(table, (row, i) => {
        let y = i * square;
        _.forEach(row, (letter, j) => {
            let x = j * square;
            loadLetter(letter, function() {
                let img = this;
                requestAnimationFrame(() => {
                    writeLetter(ctx, img, x,y, square, square);
                });
            });
        });
    });
}

module.exports = write;