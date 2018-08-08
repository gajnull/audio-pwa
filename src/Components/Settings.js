import React from 'react';
import TopMnu from './TopMnuSettings';

import options from '../data/options';

import './css/Settings.css';

 /* {settings, setSetting, gotoBack} */
 // settings:  {countRepeat: 1, speed: 1, ratePause: 1.4, metod: 'demand'}  // "demand"/"all"/"repeat"

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.handlerOnChange = this.handlerOnChange.bind(this);
  }

  handlerOnChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    switch(name) {
      case 'speed':
      case 'ratePause':
        value = onlyFloat(value);
        break;
      case 'countRepeat':
      default:  // это не должно случиться, но без этого получаем warning
        value = onlyInt(value);
        break;
    }
    this.props.setSetting(name, value);
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
            <div className="setting text" onClick={() => this.props.setSetting('metod', 'next')}>
              {metodName}
            </div>
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





function onlyInt(s) {
  let str = s.replace(/\D/g, '');
  if (str === '') return '';
  return parseInt(str, 10);
}

function onlyFloat(str) {
  let s = str.replace(/[^0-9,.]/g, "");
  s = s.replace(/,/g, ".");
  const res = s.match(/^\d*\.?\d*/);
  return res ? res[0] : s;  // эта проверка rex лишняя, т.к. при таком /^\d*\.?\d*/ всегда res != false
}
