import React from 'react';
import TopMnu from './TopMnuDialog';
import ItemDialog from './ItemDialog';
import './css/Dialog.css';
import modelTxt from '../data/modelTxt';
import player from './player';

// props = {ind, file, gotoStart, settings}
// file = {name, txt, audio} settings = {countRepeat, speed, ratePause, metod}

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.data = [];
    this.poz = 0; 
    const { before, current, after, _from, _to } =  modelTxt.getItems(this.data, this.poz);

    this.state = { //duration: "",
                   before,
                   current,
                   after
                 };
    player.range(_from, _to);             

    this.gotoBegin = this.gotoBegin.bind(this);
  }

  componentDidMount() {
    player.load('data/' + this.props.file.audio);
    //this.sound.onloadedmetadata = () => { this.setState({duration: this.sound.duration}) };
    modelTxt.loadLngt('data/' + this.props.file.txt)
            .then(data => {
              this.data = data;
              this._gotoPoz();
             });
  }

  componentWillUnmount() {
    player.unload();
    this.data = null;
  }

  gotoBegin() {
    this.poz = 0;
    this._gotoPoz();
  }

  tooglePlay() {
    player.toogle();
  }

/*   playSnd(e) {}
  stopSnd(e) {} */

  _gotoPoz() {
    const { before, current, after, _from, _to } =  modelTxt.getItems(this.data, this.poz);
    player.range(_from, _to);
    this.setState({ before, current, after });
  }

  render() {
    const {gotoStart, setSettings} = this.props;
    return (
      <div className="Dialog">
        <TopMnu gotoStart={gotoStart} gotoBegin={this.gotoBegin} setSettings={setSettings} />
        <div className="items">
          <ItemDialog txt={this.state.before} onClick={() => {this.poz--; this._gotoPoz()}} />
          <ItemDialog txt={this.state.current} active onClick={this.tooglePlay} />
          <ItemDialog txt={this.state.after} onClick={() => {this.poz++; this._gotoPoz()}} />
        </div>
      </div>
    );
  }
}

export default Dialog;
