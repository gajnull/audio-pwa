import React from 'react';
import TopMnu from './TopMnuDialog';
import './css/Dialog.css';
import dataTxt from '../data/dataTxt';
import player from '../data/player';
import dataStats from '../data/dataStats';

// props = {file, gotoStart, setPlayStatus}
// file = {name, txt, transl, audio}
class FullDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
                  isPlay: false,
                  items: []
                 };

    this.toBegin = this.toBegin.bind(this);
    this.handlePlayBefore = this.handlePlayBefore.bind(this);
    this.handlePlayAfter = this.handlePlayAfter.bind(this);
    player.setGotoNextFn(this.nextPoz.bind(this));  // возможность для плеера переходить к слудующему участку
    player.onSetPlayStatus(this.setPlayStatus.bind(this));

    const pathAudio = this.props.file.dir + '/' + this.props.file.audio;
    player.load(pathAudio);
  }

  componentDidMount() {
    const pathLngt = this.props.file.dir + '/' + this.props.file.lngt;
    const pathTransl = this.props.file.dir + '/' + this.props.file.transl;
    dataTxt.loadLngt(pathLngt)
            .then(() => { dataTxt.loadTransl(pathTransl) })
            .then(() => { this.setState({items: dataTxt.getAllItems()}) });

    player.loadSettings();
    dataStats.startDialog();
  }

  componentWillUnmount() {
    player.unload();
    dataTxt.unload();  // возможно потом это надо занести в зарузку с проверкой на смену файла
    dataStats.stopDialog(this.props.file.name);
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

  render() {
    const {gotoStart, isTransl, kind} = this.props;
    //player.settings(settings);
    return (
      <div className="fullDialog">
        <TopMnu gotoHome={gotoStart} gotoBegin={this.toBegin}
                tooglePlay={this.handleTooglePlay} isPlay={this.state.isPlay} />
        <div className="items-dlg">
          {
            this.state.items.map((item) => {
              <ItemDialog key={item.from} item={item}
                kind={this.props.kind}
                onClick={() => this.handleTooglePlay(item.from, item.to)} />
            })
          }
        </div>
      </div>
    );
  }
}


const ItemDialog = ({txt, active, onClick}) => {
  let style = "item-dlg";
  style = active ? style + ' active' : style;
  return <span  className={style} onClick={onClick}> {txt} </span>;
}


export default FullDialog;
