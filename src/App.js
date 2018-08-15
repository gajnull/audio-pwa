import React from 'react';
import { loadFiles } from './data/dataFiles';
import dataSettings from './data/dataSettings';
import dataStats from './data/dataStats';
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
    mnu: true,  // показывать нижнее меню
    metod: dataSettings.initSettings(),
    files: []
  };

  constructor() {
    super();
    this.pageBefore = 'start';
    this.gotoPage = this.gotoPage.bind(this);
    this.selectDialog = this.selectDialog.bind(this);
    this.setMetod = this.setMetod.bind(this);
  }

  componentDidMount() {
    loadFiles().then( files => { this.setState({files}) });
  }
/*
  showMnu(isShow) { // пока не используется
    this.setState({mnu: isShow});
  }

  setDataStats(name, value) { // пока не используется
    statistic.setParam(name, value);
  }
*/
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

  setMetod(_metod) {
    if (this.state.metod === _metod) return;
    const metod = dataSettings.setMetod(_metod);
    this.setState({metod});
  }


  render() {
    let main = <p> Unknown page </p>
    if (this.state.page === 'start')
            main = <Start files={this.state.files} selectDialog={this.selectDialog} gotoStats={() => this.gotoPage('statistic')}/>;
    if (this.state.page === 'dialog')
            main = <Dialog file={this.state.files[this.ind]}
              gotoStart={() => this.gotoPage('start')}
              setPlayStatus={this.setPlayStatus} />;
    if (this.state.page === 'settings')
            main = <Settings setMetod={this.setMetod} metod={this.state.metod}
              gotoBack={() => {this.gotoPage(this.pageBefore)}} />;
    if (this.state.page === 'statistic')
            main = <Stats gotoStart={() => this.gotoPage('start')} />;

    const menu = this.state.mnu ?
              <BottomMnu activeMetod={this.state.metod}
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
