import React, {Component} from 'react';
import './Download.css';

export default class Downloader extends Component
{
    render() {
        return <a className="Download" title="Download"><span role="img" aria-label="download">⤵️</span></a>
    }
}