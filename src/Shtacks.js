import React, { Component} from 'react';
import './Shtacks.css';
import Footer from './Footer';
import Download from './Download';
import ShtackCanvas from './ShtackCanvas';

const defaultText = "type something abcdefghijklmnopqrstuvwxyz<3";

class Shtacks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: this.getInitialText()
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setCanvas = this.setCanvas.bind(this);
    this.getCanvas = this.getCanvas.bind(this);
  }

  /**
   * @param {HTMLCanvasElement} canvas 
   */
  setCanvas(canvas) {
    this.canvas = canvas;
  }

  /**
   * @return {HTMLCanvasElement}
   */
  getCanvas() {
    return this.canvas;
  }

  getInitialText() {
    if (global.location.search) {
      return decodeURIComponent(global.location.search.substr(1));
    }
    return defaultText;
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.setState({text: ''});
    }
  }

  handleTextChange(event) {
    let text = event.target.value;
    let q = '?' + encodeURIComponent(text);
    window.history.pushState(null, text, q);
    this.setState({text: event.target.value});
  }

  render() {
    return (
      <div className="Shtacks">
        <input autoFocus
          type="text" 
          className="Capture" 
          value={this.state.text} 
          onChange={this.handleTextChange}
          onKeyDown={this.handleKeyDown}
          placeholder="type something abcdefghijklmnopqrstuvwxyz<3" />
        <ShtackCanvas text={this.state.text} setCanvas={this.setCanvas} />
        <Footer>
          <Download getCanvas={this.getCanvas} text={this.state.text}/>
        </Footer>
      </div>
    );
  }
}

export default Shtacks;
