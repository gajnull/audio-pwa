import React from 'react';
import files from './data/metaData';  // [{name, txt, audio}, ...]
import options from './data/options';
import './reset.css'; // попробовать это убрать
import './App.css';
import Start from './Components/Start';
import Dialog from './Components/Dialog';
import Settings from './Components/Settings';
import BottomMnu from './Components/BottomMnu';


export default class App extends React.Component {

  state = {
    page: 'start',  // page: 'start'/'dialog'/'settings'/'statistics'
    settings: options.getSettings()
  };

  constructor() {
    super();
    this.pageBefore = 'start';
    this.gotoPage = this.gotoPage.bind(this);
    this.setMetod = this.setMetod.bind(this);
    this.selectDialog = this.selectDialog.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  selectDialog(ind) {
    this.ind = ind;
    this.setState({page: 'dialog'});
  }

  gotoPage(page) {
    this.pageBefore = this.state.page;
    this.setState({page});
  }

  setMetod(metod) { // наверное надо совместить с setSettings
    if (this.state.settings.metod === metod) return;
    const settings = options.setMetod(this.state.settings, metod);
    this.setState({settings});
  }

  setSettings(settings) { // data = {countRepeat, speed, ratePause, metod}
    //const settings = options.correctData(data);
    this.setState({settings});
  }


  render() {
    let main = <p> Unknown stateApp </p>
    if (this.state.page === 'start')
            main = <Start files={files} selectDialog={this.selectDialog}
              settings={this.state.settings} />;
    if (this.state.page === 'dialog')
            main = <Dialog ind={this.ind} file={files[this.ind]}
              gotoStart={() => this.gotoPage('start')} settings={this.state.settings}
              setPlayStatus={this.setPlayStatus} />;
    if (this.state.page === 'settings')
            main = <Settings settings={this.state.settings}
            setMetod={this.setMetod} setSettings={this.setSettings} 
              gotoBack={() => {this.gotoPage(this.pageBefore)}} />;
    return (
      <div className="App">
        {main}
        <BottomMnu activeMetod={this.state.settings.metod}
                  isSettings={this.state.page === 'settings'}
                  setMetod={this.setMetod}
                  gotoSettings={() => {this.gotoPage('settings')}} />
      </div>
    );
  }
}
