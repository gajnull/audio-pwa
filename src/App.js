import React from 'react';
import logo from './logo.svg';
import files from './data/metaData';
import './reset.css';
import './App.css';
import Start from './Components/Start';
import Dialog from './Components/Dialog';


/* const App2 = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
); */

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
    if (this.state.stateApp === 'start') location = <Start files={files} selectDialog={this.selectDialog}/>;
    if (this.state.stateApp === 'dialog') location = <Dialog ind={this.ind} file={files[this.ind]} gotoStart={this.gotoStart} />;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Lngt</h1>
        </header>
        {location}
      </div>
    );
  }
}

export default App;
