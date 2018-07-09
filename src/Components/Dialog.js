import React from 'react';
import './Dialog.css';

/* const Dialog = (props) => (
  <div className="Dialog" onClick={props.gotoStart}>
    <p> Index: {props.ind} </p>
    <p> file.name: {props.file.name} </p>
    <p> file.txt: {props.file.txt} </p>
    <p> file.audio: {props.file.audio} </p>
  </div>
); */

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.sound = new Audio('data/' + props.file.audio);
    this.playSnd = this.playSnd.bind(this);
  }

  playSnd(e) {
    e.preventDefault();
    this.sound.play();
  }

  render() {
    return (
      <div className="Dialog">
        <p> Index: {this.props.ind} </p>
        <p> file.name: {this.props.file.name} </p>
        <p> file.txt: {this.props.file.txt} </p>
        <p> file.audio: {this.props.file.audio} </p>
        <button className="btn"  onClick={this.props.gotoStart}>return</button>
        <button className="btn"  onClick={this.playSnd}>play</button> 
      </div>
    );
  }
}

export default Dialog;
