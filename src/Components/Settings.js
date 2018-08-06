import React from 'react';
import TopMnu from './TopMnuSettings';

import options from '../data/options';

import './css/Settings.css';

 /* {settings, setSettings, nextMetod, gotoBack} */
 // settings:  {countRepeat: 1, speed: 1, ratePause: 1.4, metod: 'demand'}  // "demand"/"all"/"repeat"

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.handlerOnChange = this.handlerOnChange.bind(this);
    this.nextMetod = this.nextMetod.bind(this);
  }

  handlerOnChange(e) {
    console.dir(e.target.name);
  }

  nextMetod() {
    const settings = this.props.settings
    const metod = options.nextMetod(settings.metod);
    this.props.setSettings({...settings, metod});
  }

  render() {
    const {gotoBack, settings} = this.props;
    const metodName = options.getNameMetod(settings.metod);
    return (
      <div className="settings">
        <TopMnu gotoBack={gotoBack} />
        <div className="items">
          <Item label="Число повторений одного блока" value={settings.countRepeat}
                name={'countRepeat'} onChange={this.handlerOnChange} />
          <Item label="Скорость воспроизведения" value={settings.speed}
                name={'speed'} onChange={this.handlerOnChange} />
          <Item label="Относительная длительность пауз" value={settings.ratePause}
                name={'ratePause'} onChange={this.handlerOnChange} />

          <div className="item">
            <div className="label"> Метод повторений </div>
            <div className="setting" onClick={this.nextMetod}> {metodName} </div>
          </div>

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
