import React from 'react';
import './Dialog.css';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.sound = new Audio('data/' + props.file.audio);
    this.playSnd = this.playSnd.bind(this);
    this.stopSnd = this.stopSnd.bind(this);
    this.state = { duration: "" };
    this.sound.onloadedmetadata = () => { this.setState({duration: this.sound.duration}) };
  }

  componentWillUnmount() {
    this.sound.pause();
    this.sound.src = "";
  }

  playSnd(e) {
    this.sound.currentTime = 70;
    this.sound.play();
  }

  stopSnd(e) {
    this.sound.pause();
  }

  render() {
    return (
      <div className="Dialog">
        <p className="before"> {this.props.ind} </p>
        <p className="current"> file.name: {this.props.file.name} </p>
        <p className="after"> file.txt: {this.props.file.txt} </p>
        <p> file.audio: {this.props.file.audio} </p>
        <button className="btn"  onClick={this.props.gotoStart}>return</button>
        <button className="btn"  onClick={this.playSnd}>play</button>
        <button className="btn"  onClick={this.stopSnd}>stop</button>
        <p> Duration: {this.state.duration} </p>
      </div>
    );
  }
}

export default Dialog;
