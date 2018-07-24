import React from 'react';
import files from './data/metaData';  // [{name, txt, audio}, ...]
import './reset.css';
import './App.css';
import Start from './Components/Start';
import Dialog from './Components/Dialog';
import BottomMnu from './Components/BottomMnu';


let defaultSettings = {
  countRepeat: 1,
  speed: 1,
  ratePause: 1,
  metod: 'demand'  // "demand"/"all"/"repeat"
};

let isPlay = false;

class App extends React.Component {
  constructor() {
    super();
    this.state = {stateApp: 'start',  // stateApp: 'start'/'dialog'
                  settings: defaultSettings};
    this.gotoStart = this.gotoStart.bind(this);
    this.setMetod = this.setMetod.bind(this);
    this.selectDialog = this.selectDialog.bind(this);
  }

  selectDialog(ind) {
    this.ind = ind;
    this.setState({stateApp: 'dialog'});
  }

  gotoStart() {
    this.setState({stateApp: 'start'});
  }

  setMetod(metod) {
    if (this.state.settings.metod === metod) return;
    const settings = {...this.state.settings, metod};
    this.setState({settings});
  }

  render() {
    let main = <p> Unknown stateApp </p>
    if (this.state.stateApp === 'start')
            main = <Start files={files} selectDialog={this.selectDialog}
              settings={this.state.settings} />;
    if (this.state.stateApp === 'dialog')
            main = <Dialog ind={this.ind} file={files[this.ind]}
              gotoStart={this.gotoStart} settings={this.state.settings} />;
    return (
      <div className="App">
        {main}
        <BottomMnu activeMetod={this.state.settings.metod} isPlay={isPlay} isDialog={this.state.stateApp === 'dialog'} setMetod={this.setMetod} />
      </div>
    );
  }
}

export default App;
