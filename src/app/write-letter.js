
/**
 * Convenient wrapper around the draw image method
 * 
 * This does _nothing_ right now but passes through,
 * but maybe one day it will handle fade-in or something neat.
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLImageElement} img 
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 */
function writeLetter(ctx, img, x, y, w, h) {
    ctx.drawImage(img, x, y, w, h);
}

module.exports = writeLetter;