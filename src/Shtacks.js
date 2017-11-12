import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import './Shtacks.css';
import Footer from './Footer';
import Download from './Download';

class Shtacks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "type something abcdefghijklmnopqrstuvwxyz<3"
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.canvas = ReactDOM.findDOMNode(this.refs.shtack);
    this.ctx = this.canvas.getContext('2d');
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.setState({text: ''});
    }
  }

  handleTextChange(event) {
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
        <canvas ref="shtack" className="shtack" />
        <Footer>
          <Download />
        </Footer>
      </div>
    );
  }
}

export default Shtacks;
