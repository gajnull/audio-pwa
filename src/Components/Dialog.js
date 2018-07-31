import React from 'react';
import TopMnu from './TopMnuDialog';
import ItemDialog from './ItemDialog';
import './css/Dialog.css';
import modelTxt from '../data/modelTxt';
import player from './player';

// props = {ind, file, gotoStart, setPlayStatus, settings}
// file = {name, txt, audio} settings = {countRepeat, speed, ratePause, metod}

class Dialog extends React.Component {


  constructor(props) {
    super(props);

    this.data = [];
    this.poz = 0;
    const { before, current, after, _from, _to } =  modelTxt.getItems(this.data, this.poz);
    this.state = {
                   before,
                   current,
                   after
                 };
    player.range(_from, _to);

    this.gotoBegin = this.gotoBegin.bind(this);
    this.handlePlayBefore = this.handlePlayBefore.bind(this);
    this.handlePlayAfter = this.handlePlayAfter.bind(this);
    player.setGotoNextFn(this.nextPoz.bind(this));  // возможность для плеера переходить к слудующему участку
    player.onSetPlayStatus(this.props.setPlayStatus);

    player.load('data/' + this.props.file.audio);
  }

  componentDidMount() {
    modelTxt.loadLngt('data/' + this.props.file.txt)  // т.к. в this._gotoPoz() используется setState
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
    player.stop();
    this.poz = 0;
    this._gotoPoz();
  }

  handleTooglePlay() {  // bind здесь не нужен, т.к. не используется this
    player.toogle();
  }

  handlePlayBefore() {
    this.poz--;
    this._gotoPoz()
    player.playAtOnce();
  }

  handlePlayAfter() {
    this.poz++;
    this._gotoPoz()
    player.playAtOnce();
  }

  nextPoz() {
    if (modelTxt.isLastPoz(this.data, this.poz)) return false;
    this.poz++;
    this._gotoPoz();
    return true;
  }

  _gotoPoz() {
    const { before, current, after, _from, _to } =  modelTxt.getItems(this.data, this.poz);
    player.range(_from, _to);
    this.setState({ before, current, after });
  }

  render() {
    const {gotoStart, setSettings, settings} = this.props;
    player.settings(settings);
    return (
      <div className="Dialog">
        <TopMnu gotoStart={gotoStart} gotoBegin={this.gotoBegin} setSettings={setSettings} />
        <div className="items">
          <div>
          <ItemDialog txt={this.state.before} onClick={this.handlePlayBefore} />
          <ItemDialog txt={this.state.current} active onClick={this.handleTooglePlay} />
          <ItemDialog txt={this.state.after} onClick={this.handlePlayAfter} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
