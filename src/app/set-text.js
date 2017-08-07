/**
 * Extract the query string text and set as the value in input
 * @param {HTMLInputElement} input 
 * @param {string} search
 * @returns undefined
 */
function setText(input, search) {
    let s = search.substr(1);
    if (s) {
        input.value = decodeURIComponent(s);
    }
    else {
        input.value = input.placeholder;
    }
}

module.exports = setText;