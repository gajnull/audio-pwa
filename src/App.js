import React from 'react';
import logo from './logo.svg';
import './App.css';

import files from './data/data';

// const App2 = () => (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <h1 className="App-title">Welcome to React</h1>
//     </header>
//     <p className="App-intro">
//       To get started, edit <code>src/App.js</code> and save to reload.
//     </p>
//   </div>
// );

class App extends React.Component {
  constructor() {
    super();
    this.state = {files};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Lngt</h1>
        </header>
        <ul className="App-intro">
          { this.state.files.map((file, index) =>
              <li key={index}>{file.name}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default App;
