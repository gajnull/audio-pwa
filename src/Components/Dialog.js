import React from 'react';
import ItemDialog from './ItemDialog';
import './Dialog.css';
import modelTxt from '../data/modelTxt';
//import Exz from '../data/Exz';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    
    this.data = [];
    this.poz = 0; // потом будет this.poz = 0;
    const { before, current, after } =  modelTxt.getItems(this.data, this.poz);

    this.state = { duration: "",
                   before,
                   current,
                   after
                 };
    //this.sound.onloadedmetadata = () => { this.setState({duration: this.sound.duration}) };


    this.playSnd = this.playSnd.bind(this);
    this.stopSnd = this.stopSnd.bind(this);
  }

  componentDidMount() {
    this.sound = new Audio('data/' + this.props.file.audio);
    modelTxt.loadLngt('data/' + this.props.file.txt)
            .then(data => {
              this.data = data;
              const { before, current, after } =  modelTxt.getItems(data, this.poz);
              this.setState({ before, current, after })
             });
  }

  componentWillUnmount() {
    this.sound.pause();
    this.sound.src = "";
    this.data = null;
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
        <div> Duration: {this.state.duration} </div>
        <ItemDialog txt={this.state.before} /> 
        <ItemDialog txt={this.state.current} /> 
        <ItemDialog txt={this.state.after} /> 
        <span> {this.state.before} </span>
        <span> {this.state.current} </span>
        <span> {this.state.after} </span>

      </div>
    );
  }
}

export default Dialog;
