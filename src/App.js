import React from 'react';
import files from './data/metaData';  // [{name, txt, audio}, ...]
import * as options from './data/options';
import * as statistic from './data/statistic';
import './reset.css'; // попробовать это убрать
import './App.css';
import Start from './Components/Start';
import Dialog from './Components/Dialog';
import Settings from './Components/Settings';
import Stats from './Components/Stats';
import BottomMnu from './Components/BottomMnu';


export default class App extends React.Component {

  state = {
    page: 'start',  // page: 'start'/'dialog'/'settings'/'statistics'
    mnu: true,
    settings: options.getSettings()
  };

  constructor() {
    super();
    this.pageBefore = 'start';
    this.gotoPage = this.gotoPage.bind(this);
    this.selectDialog = this.selectDialog.bind(this);
    this.setMetod = this.setMetod.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.setDefSettings = this.setDefSettings.bind(this);
    this.setSetting = this.setSetting.bind(this);
  }

  showMnu(isShow) { // пока не используется
    this.setState({mnu: isShow});
  }

  setDataStats(name, value) { // пока не используется
    statistic.setParam(name, value);
  }  

  selectDialog(ind) {
    this.ind = ind;
    this.setState({page: 'dialog'});
  }

  gotoPage(page) {
    this.pageBefore = this.state.page;
    let mnu = true;
    if (page === 'statistic') mnu = false;
    this.setState({page, mnu});
  }

  setMetod(metod) {
    if (this.state.settings.metod === metod) return;
    let settings = this.saveSettings() || this.state.settings;
    settings = options.setMetod(settings, metod);
    this.setState({settings});
  }

  saveSettings() {
    return options.saveSettings(this.state.settings);
  }

  setSetting(name, value) {
    switch (name) {
      case 'metod':
        this.setMetod(value);
        break;
      default:  // 'speed'/'ratePause'/'countRepeat'
        this.setState((state) => {
          const settings = {...state.settings};
          settings[name] = value;
          return {settings};
        });
    }
  }

  setDefSettings() {
    const settings = options.getDefSettings(this.state.settings);
    this.setState({settings});
  }


  render() {
    let main = <p> Unknown page </p>
    if (this.state.page === 'start')
            main = <Start files={files} selectDialog={this.selectDialog} gotoStats={() => this.gotoPage('statistic')}/>;
    if (this.state.page === 'dialog')
            main = <Dialog ind={this.ind} file={files[this.ind]}
              gotoStart={() => this.gotoPage('start')} settings={this.state.settings}
              setPlayStatus={this.setPlayStatus} />;
    if (this.state.page === 'settings')
            main = <Settings settings={this.state.settings} setDefSettings={this.setDefSettings}
              setSetting={this.setSetting} saveSettings={this.saveSettings}
              gotoBack={() => {this.gotoPage(this.pageBefore)}} />;
    if (this.state.page === 'statistic')
            main = <Stats gotoStart={() => this.gotoPage('start')} />;

    const menu = this.state.mnu ?
              <BottomMnu activeMetod={this.state.settings.metod}
                isSettings={this.state.page === 'settings'}
                setMetod={this.setMetod}
                gotoSettings={() => {this.gotoPage('settings')}} />
                : null;

    return (
      <div className="App">
        {main}
        {menu}
      </div>
    );
  }
}
