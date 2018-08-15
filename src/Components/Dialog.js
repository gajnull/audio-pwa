import React from 'react';
import TopMnu from './TopMnuDialog';
import ItemDialog from './ItemDialog';
import './css/Dialog.css';
//import modelTxt from '../data/modelTxt';
import dataTxt from '../data/dataTxt';
import player from '../data/player';

// props = {file, gotoStart, setPlayStatus}
// file = {name, txt, audio} 

class Dialog extends React.Component {

  constructor(props) {
    super(props);
    this.poz = 0;
    const { before, current, after, _from, _to } =  dataTxt.getItems(this.poz);
    const transl = dataTxt.getTransl(this.poz);
    this.state = { isPlay: false,
                   before,
                   current,
                   transl,
                   after
                 };
    player.range(_from, _to);

    this.toBegin = this.toBegin.bind(this);
    this.handlePlayBefore = this.handlePlayBefore.bind(this);
    this.handlePlayAfter = this.handlePlayAfter.bind(this);
    player.setGotoNextFn(this.nextPoz.bind(this));  // возможность для плеера переходить к слудующему участку
    player.onSetPlayStatus(this.setPlayStatus.bind(this));

    player.load('data/' + this.props.file.audio);
  }

  componentDidMount() {
    dataTxt.loadLngt(this.props.file.txt)  // т.к. в this._gotoPoz() используется setState
            .then( () => { this._gotoPoz() });
    if (this.props.file.transl) {
      dataTxt.loadTransl(this.props.file.transl)
              .then(transl => { this.setState({transl}) });
    }
  }

  componentWillUnmount() {
    player.unload();
    dataTxt.unload();  // возможно потом это надо занести в зарузку с проверкой на смену файла
  }

  setPlayStatus(isPlay) {
    this.setState((state) => {
      if (state.isPlay !== isPlay) return {isPlay};
    });
  }

  toBegin() {
    player.stop();
    this.poz = 0;
    this._gotoPoz();
  }

  handleTooglePlay() {  // bind здесь не нужен, т.к. не используется this
    player.toogle();
  }

  handlePlayBefore() {
    if (this.poz > 0) {
      this.poz--;
      this._gotoPoz();
    }
    player.playAtOnce();
  }

  handlePlayAfter() {
    if (!dataTxt.isLastPoz(this.poz)) {
      this.poz++;
      this._gotoPoz();
    }
    player.playAtOnce();
  }

  nextPoz() {
    if (dataTxt.isLastPoz(this.poz)) return false;
    this.poz++;
    this._gotoPoz();
    return true;
  }

  _gotoPoz() {
    const { before, current, after, _from, _to } =  dataTxt.getItems(this.poz);
    const transl = dataTxt.getTransl(this.poz);
    player.range(_from, _to);
    this.setState({ before, current, after, transl });
  }

  render() {
    const {gotoStart} = this.props;
    //player.settings(settings);
    return (
      <div className="Dialog">
        <TopMnu gotoHome={gotoStart} gotoBegin={this.toBegin}
                tooglePlay={this.handleTooglePlay} isPlay={this.state.isPlay} />
        <div className="items-dlg">
          <div className="empty-dlg" onClick={this.handlePlayBefore} ></div>
          <div>
            <ItemDialog txt={this.state.before} onClick={this.handlePlayBefore} />
            <ItemDialog txt={this.state.current} active onClick={this.handleTooglePlay} />
            <ItemDialog txt={this.state.transl} translate onClick={this.handleTooglePlay} />
            <ItemDialog txt={this.state.after} onClick={this.handlePlayAfter} />
          </div>
          <div className="empty-dlg" onClick={this.handlePlayAfter} ></div>
        </div>
      </div>
    );
  }
}

export default Dialog;
