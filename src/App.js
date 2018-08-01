import React from 'react';
import files from './data/metaData';  // [{name, txt, audio}, ...]
import tunesAudio from './data/tunesAudio';
import './reset.css';
import './App.css';
import Start from './Components/Start';
import Dialog from './Components/Dialog';
import BottomMnu from './Components/BottomMnu';


export default class App extends React.Component {

  state = {
    stateApp: 'start',  // stateApp: 'start'/'dialog',
    isPlay: false,
    settings: {
      countRepeat: 1,
      speed: 1,
      ratePause: 1.4,
      metod: 'demand',  // "demand"/"all"/"repeat"
      lastCountRepeatForAll: 3,
      maxCountRepeatFoRepeat: 20  // только на случай, если забудет выключить
    }
  };

  constructor() {
    super();
    this.gotoBack = this.gotoBack.bind(this);
    this.setMetod = this.setMetod.bind(this);
    this.selectDialog = this.selectDialog.bind(this);
    this.setPlayStatus = this.setPlayStatus.bind(this);
  }

  selectDialog(ind) {
    this.ind = ind;
    this.setState({stateApp: 'dialog'});
  }

  gotoBack(root) {
    this.setState({stateApp: root});
  }

  setMetod(metod) {
    if (this.state.settings.metod === metod) return;
    const settings = tunesAudio.setMetod(this.state.settings, metod);
    this.setState({settings});
  }

  setPlayStatus(isPlay) {
    this.setState((state) => {
      if (state.isPlay !== isPlay) return {isPlay};
    });
  }

  render() {
    let main = <p> Unknown stateApp </p>
    if (this.state.stateApp === 'start')
            main = <Start files={files} selectDialog={this.selectDialog}
              settings={this.state.settings} />;
    if (this.state.stateApp === 'dialog')
            main = <Dialog ind={this.ind} file={files[this.ind]}
            gotoBack={this.gotoBack} settings={this.state.settings} setPlayStatus={this.setPlayStatus} />;
    return (
      <div className="App">
        {main}
        <BottomMnu activeMetod={this.state.settings.metod} isPlay={this.state.isPlay} isDialog={this.state.stateApp === 'dialog'} setMetod={this.setMetod} />
      </div>
    );
  }
}
