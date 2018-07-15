import React from 'react';
import files from './data/metaData';
import './reset.css';
import './App.css';
import Start from './Components/Start';
import Dialog from './Components/Dialog';
import TopMnu from './Components/TopMnu';
import BottomMnu from './Components/BottomMnu';


class App extends React.Component {
  constructor() {
    super();
    this.state = {stateApp: 'start'};   // stateApp: 'start'/'dialog'
    this.gotoStart = this.gotoStart.bind(this);
    this.selectDialog = this.selectDialog.bind(this);
  }

  selectDialog(ind) {
    this.ind = ind;
    this.setState({stateApp: 'dialog'});
  }

  gotoStart() {
    this.setState({stateApp: 'start'});
  }

  render() {
    let location = <p> Unknown stateApp </p>
    if (this.state.stateApp === 'start') location = <Start files={files} selectDialog={this.selectDialog} settings={settings} />;
    if (this.state.stateApp === 'dialog') location = <Dialog ind={this.ind} file={files[this.ind]} gotoStart={this.gotoStart} settings={settings} />;
    return (
      <div className="App">
        <TopMnu />
        {location}
        <BottomMnu />        
      </div>
    );
  }
}

const settings = {  // потом возможно сделаем членом класса App
  countR: 1,
  speed: 1,
  pause: 1,
  metod: "repeat"  // "repeate"/"all"/"demand"
}

export default App;


// <img src={logo} className="App-logo" alt="logo" />
