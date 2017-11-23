import React, { Component} from 'react';
import PropTypes from 'prop-types';
import './ShtackCanvas.css';

import _ from 'lodash';
import smartquotes from 'smartquotes';

import loadLetter from './alphabet';

const heart = "\u2764";
const placeholdersToUnicode = {
    ":heart:": heart,
    "_heart": heart,
    "_heart_": heart,
    "<3": heart,
    "–": "-", // en dash
    "—": "-", // em dash
    "\\.\\.\\.": "…" // ellipsis
};

export default class ShtackCanvas extends Component
{
    constructor(props) {
        super(props);
        this.rewrite = this.rewrite.bind(this);
    }

    write(text) {
        text = smartquotes(this.replaceGlyphs(text.toUpperCase()));

        // get window width
        let width = document.documentElement.clientWidth;
        // let's pick a square dimension for our letters
        let square = width >= 600 ? 150 : 75; 
        // calculate canvas size from text
        let l = text.length;
        let dimensions = this.getDimensions(width, l, square);
        // clear and resize canvas
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.canvas.width = dimensions.width;
        this.canvas.height = dimensions.height;
        let ctx = this.ctx;
        // create a table of letters to load
        let table = _.chunk(text.split(''), dimensions.cols);
        table.forEach((row, i) => {
            let y = i * square;
            row.forEach((letter, j) => {
                let x = j * square;
                loadLetter(letter, function() {
                    let img = this;
                    requestAnimationFrame(() => {
                        ctx.drawImage(img, x, y, square, square);
                    });
                })
            });
        });
    }

    rewrite() {
        this.write(this.props.text);
    }
    /**
     * @param {string} text 
     * @return {string}
     */
    replaceGlyphs(text) {
        Object.keys(placeholdersToUnicode).forEach(placeholder => {
            let r = new RegExp(placeholder, 'gi');
            text = text.replace(r, placeholdersToUnicode[placeholder]);
        });
        return text;
    }

    /**
     * @typedef {object} WriteDimensions
     * @property {number} width width in pixels
     * @property {number} height height in pixels
     * @property {number} rows total rows of letters
     * @property {number} cols total columns of letters
     * 
     * 
     * @param {number} w width of drawing area
     * @param {number} l length of string of text
     * @param {number} d dimensions (square) of a letter
     * @return {WriteDimensions}
     */
    getDimensions(w, l, d) {
        let cols = Math.floor(w/d);
        let width = cols * d;
        let rows = (cols > l) ? 1 : Math.floor(l / cols) + (l % cols);
        let height = rows * d;
        return {
            width,
            height,
            rows,
            cols
        }
    }

    componentDidMount() {
        this.props.setCanvas(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.write(this.props.text);
        window.addEventListener('resize', _.debounce(this.rewrite, 200));
    }

    componentDidUpdate() {
        this.write(this.props.text);
    }

    render() {
        return <canvas ref={(canvas) => this.canvas = canvas} className="ShtackCanvas" />
    }

}

ShtackCanvas.PropTypes = {
    text: PropTypes.string,
    setCanvas: PropTypes.func
}

ShtackCanvas.defaultProps = {
    setCanvas: _.noop
}