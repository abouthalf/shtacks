import React, {Component} from 'react';
import './Download.css';

import _ from 'lodash';
import slugify from 'slugify';

export default class Downloader extends Component
{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let canvas = this.props.getCanvas();
        if (canvas) {
            if (!_.isUndefined(this.el.download)) {
                this.el.href = canvas.toDataURL();
                this.el.download = slugify(this.props.text) + ".png";
            } else {
                // if download is unsupported you find yourself in data URI hell
                let image = `<img src="${canvas.toDataURL()}" />`;
                let w = window.open();
                w.document.write(image);
                event.preventDefault();
                event.stopPropagation();
            }
        }
    } 

    render() {
        return <a ref={(a) => this.el = a} 
            className="Download" 
            title="Download"
            onClick={this.handleClick}>
                <span role="img" aria-label="download">⤵️</span>
            </a>
    }
}

Downloader.defaultProps = {
    getCanvas: _.noop,
    text: ''
}