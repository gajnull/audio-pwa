import React from 'react';
import TopMnu from './TopMnuSettings';

import options from '../data/options';

import './css/Settings.css';

 /* {settings, setSettings, setMetod, gotoBack} */
 // settings:  {countRepeat: 1, speed: 1, ratePause: 1.4, metod: 'demand'}  // "demand"/"all"/"repeat"

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.handlerOnChange = this.handlerOnChange.bind(this);
    this.nextMetod = this.nextMetod.bind(this);
  }

  handlerOnChange(e) {
    console.log(e.target.name);
    console.log(e.target.value);
    console.dir(e.target);
  }

  nextMetod() {
    const metod = options.nextMetod(this.props.settings.metod);
    this.props.setMetod(metod);
  }

  render() {
    const {gotoBack, settings} = this.props;
    const {metod, countRepeat, speed, ratePause} = settings;
    const metodName = options.getNameMetod(metod);
    const notDemand = (metod !== 'demand');
    return (
      <div className="settings">
        <TopMnu gotoBack={gotoBack} />
        <div className="items">

          <div className="item">
            <div className="label"> Метод повторений </div>
            <div className="setting text" onClick={this.nextMetod}> {metodName} </div>
          </div>

          { notDemand &&
            <Item label="Число повторений одного блока" value={countRepeat}
            name={'countRepeat'} onChange={this.handlerOnChange} /> }
          
            <Item label="Скорость воспроизведения" value={speed}
                name={'speed'} onChange={this.handlerOnChange} />
          
          { notDemand &&
            <Item label="Относительная длительность пауз" value={ratePause}
            name={'ratePause'} onChange={this.handlerOnChange} /> }

        </div>
      </div>
    );
  }
}

const Item = (props) => (
  <div className="item">
    <div className="label">{props.label} </div>
    <input type="text" value={props.value} className="setting"
          name={props.name} onChange={props.onChange} />
  </div>
);


export default Settings;
