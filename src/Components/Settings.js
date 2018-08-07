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
    let s;
    switch(e.target.name) {
      case 'countRepeat':
        s = toInt(e.target.value);
        break;
      case 'speed':
        s = e.target.value;
        break;
      case 'ratePause':
        s = e.target.value;
        break;
    }
    const settings = this.props.settings;
    settings[e.target.name] = s;
    this.props.setSettings(settings);
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


function toInt(s) {
  let str = s.replace(/\D/g, '');
  if (!str) return ''; 
  return parseInt(str);
}

function toFloat(s) {
  let str = s.replace(/[^0-9,.]/g, "");
  str = str.replace(/,/g, ".");
  const res = str.match(/^(\d)*\.(\d)*/);
  if
}
