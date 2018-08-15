import React from 'react';
import TopMnu from './TopMnuSettings';

import dataSettings from '../data/dataSettings';
import './css/Settings.css';

 /* props = {metod, setMetod, gotoBack} */
class Settings extends React.Component {

  state = { settings: dataSettings.getTimeSettings() }; // settings:  {countRepeatAll, countRepeatRepeat, speed, ratePause}

  constructor(props) {
    super(props);
    this.handlerOnChange = this.handlerOnChange.bind(this);
    this.setDefSettings = this.setDefSettings.bind(this);
    this.setNextMetod = this.setNextMetod.bind(this);
    this.toogleTransl = this.toogleTransl.bind(this);
  }

  componentWillUnmount() {
    dataSettings.saveSettings();  // это срабатывает и при смене метода
  }

  handlerOnChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    value = (name.indexOf('countRepeat') === 0) ? onlyInt(value) : onlyFloat(value);
    this.setState((state) => {
      const settings = {...state.settings};
      settings[name] = value;
      return {settings};
    });
    dataSettings.setTimeSetting(name, value)
  }

  setDefSettings() {
    const settings = dataSettings.setDefSettings();
    this.setState({ settings });
  }

  setNextMetod() {
    this.setState({ settings: dataSettings.getTimeSettings() });  // если введены пустые или нулевые значения, то в памяти они будут значениями по умолчанию
    this.props.setMetod('next');
  }

  toogleTransl(e) {
    //console.dir(e.target.checked);
    this.setState((state) => {
      const settings = {...state.settings};
      settings.transl = dataSettings.setTransl(state.settings.transl);
      return {settings};
    });
  }


  render() {
    const {gotoBack, metod} = this.props;
    const {countRepeatAll, countRepeatRepeat, speed, ratePause, transl} = this.state.settings
    const metodName = dataSettings.getNameMetod(metod);
    return (
      <div id="settings">
        <TopMnu gotoBack={gotoBack} setDefSettings={this.setDefSettings} />
        <div className="items">

          <div className="item">
            <div className="label"> Метод повторений </div>
            <div className="setting text" onClick={this.setNextMetod}>
              {metodName}
            </div>
          </div>

          <div className="item">
            <div className="label"> Показывать перевод </div>
            <div className="setting noborder">
              <input type="checkbox" className="checkbox"
                onChange={this.toogleTransl} checked={transl} />
            </div>
          </div>

          { (metod === 'all') &&
            <Item label="Число повторений одного блока" value={countRepeatAll}
            name={'countRepeatAll'} onChange={this.handlerOnChange} /> }

          { (metod === 'repeat') &&
            <Item label="Максимальное число повторений" value={countRepeatRepeat}
              name={'countRepeatRepeat'} onChange={this.handlerOnChange} /> }

            <Item label="Скорость воспроизведения" value={speed}
                name={'speed'} onChange={this.handlerOnChange} />

          { (metod !== 'demand') &&
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
  return parseInt(str, 10); // чтобы воспринял как дестяричную систему
}

function onlyFloat(str) {
  let s = str.replace(/[^0-9,.]/g, "");
  s = s.replace(/,/g, ".");
  const res = s.match(/^\d*\.?\d*/);
  return res ? res[0] : s;  // эта проверка rex лишняя, т.к. при таком /^\d*\.?\d*/ всегда res != false
}
