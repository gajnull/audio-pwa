import React from 'react';
import TopMnu from './TopMnuDialog';
import ItemDialog from './ItemDialog';
import './css/Dialog.css';
import modelTxt from '../data/modelTxt';

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.data = [];
    this.poz = 0; // потом будет this.poz = 0;
    const { before, current, after, _from, _to } =  modelTxt.getItems(this.data, this.poz);

    this.state = { duration: "",
                   before,
                   current,
                   after
                 };
    this._from = _from;
    this._to = _to;

    this.gotoBegin = this.gotoBegin.bind(this);
    this.playSnd = this.playSnd.bind(this);
    this.stopSnd = this.stopSnd.bind(this);
  }

  componentDidMount() {
    this.sound = new Audio('data/' + this.props.file.audio);
    this.sound.onloadedmetadata = () => { this.setState({duration: this.sound.duration}) };
    modelTxt.loadLngt('data/' + this.props.file.txt)
            .then(data => {
              this.data = data;
              this._gotoPoz();
              //const { before, current, after, _from, _to } =  modelTxt.getItems(data, this.poz);
              //this.setState({ before, current, after });
              //this._from = _from;
              //this._to = _to;
             });
  }

  componentWillUnmount() {
    this.sound.pause();
    this.sound.src = "";
    this.data = null;
    clearTimeout(this.timer);
  }

  gotoBegin() {
    this.poz = 0;
    this._gotoPoz();
  }
  
  playSnd(e) {
    this.sound.currentTime = this._from;
    this.sound.play();
    this.timer = setTimeout(this.stopSnd, this._to * 1000);
  }

  stopSnd(e) {
    this.sound.pause();
    clearTimeout(this.timer);
  }

  _gotoPoz() {
    const { before, current, after, _from, _to } =  modelTxt.getItems(this.data, this.poz);
    this._from = _from;
    this._to = _to;      
    this.setState({ before, current, after });
  }

  render() {
    const {gotoStart, setSettings} = this.props;
    return (
      <div className="Dialog">
        <div hidden>
          <p> {this.props.ind} </p>
          <p> file.name: {this.props.file.name} </p>
          <p> file.txt: {this.props.file.txt} </p>
          <p> file.audio: {this.props.file.audio} </p>
          <button className="btn"  onClick={this.props.gotoStart}>return</button>
          <button className="btn"  onClick={this.playSnd}>play</button>
          <button className="btn"  onClick={this.stopSnd}>stop</button>
          <div> Duration: {this.state.duration} </div>
        </div>
        <TopMnu gotoStart={gotoStart} gotoBegin={this.gotoBegin} setSettings={setSettings} />
        <div className="items">
          <ItemDialog txt={this.state.before} onClick={() => {this.poz--; this._gotoPoz()}} />
          <ItemDialog txt={this.state.current} active />
          <ItemDialog txt={this.state.after} onClick={() => {this.poz++; this._gotoPoz()}} />
        </div>
      </div>
    );
  }
}

export default Dialog;
