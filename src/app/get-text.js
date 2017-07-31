let lastText = "";

/**
 * @typedef {object} TextState A container object with the current text state
 * @property {string} previous Previous complete text state
 * @property {string} current Current complete text state
 * @property {delta} delta computed difference between previous and current
 */

/**
 * 
 * @param {HTMLInputElement} input 
 * @returns {TextState}
 */
function getText(input) {

    
    return {
        previous: "",
        current: "",
        delta: ""
    }
}