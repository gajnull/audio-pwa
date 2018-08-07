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
    this.state = { isPlay: false,
                   before,
                   current,
                   after
                 };
    player.range(_from, _to);

    this.gotoBegin = this.gotoBegin.bind(this);
    this.handlePlayBefore = this.handlePlayBefore.bind(this);
    this.handlePlayAfter = this.handlePlayAfter.bind(this);
    player.setGotoNextFn(this.nextPoz.bind(this));  // возможность для плеера переходить к слудующему участку
    player.onSetPlayStatus(this.setPlayStatus.bind(this));

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

  setPlayStatus(isPlay) {
    this.setState((state) => {
      if (state.isPlay !== isPlay) return {isPlay};
    });
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
    const {gotoStart, settings} = this.props;
    player.settings(settings);
    return (
      <div className="Dialog">
        <TopMnu gotoHome={gotoStart} gotoBegin={this.gotoBegin} 
                tooglePlay={this.handleTooglePlay} isPlay={this.state.isPlay} />
        <div className="items-dlg">
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
