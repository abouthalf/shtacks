const _ = require('lodash'),
    slugify = require('slugify'),
    setText = require('./set-text.js'),
    write = require('./write.js');

// let's get some elements
/** @type {HTMLInputElement} */
let input = document.getElementById('capture');
/** @type {HTMLCanvasElement} */
let canvas = document.getElementById('shtack');
/** @type {HTMLAnchorElement} */
let download = document.getElementById('download');

// is this a phone?


// if there is text in the query string, set it as the iput value
setText(input, global.location.search);

// go go go
write(input, canvas);

// handle events
function rewrite() {
    write(input, canvas);
}
function setQuery() {
    let q = '?' + encodeURIComponent(input.value);
    window.history.pushState(null, input.value, q);
}
window.addEventListener('resize', _.debounce(rewrite, 200));
input.addEventListener('input', _.debounce(rewrite, 50));
input.addEventListener('input', _.debounce(setQuery, 50));
if ('download' in download) {
    download.addEventListener('click', event => {
        download.href = canvas.toDataURL("image/png");
        download.download = slugify(input.value) + ".png";
    });
} else {
    download.parentNode.removeChild(download);
}

window.addEventListener('popstate', event => {
    setText(input, global.location.search);
    rewrite();
});
