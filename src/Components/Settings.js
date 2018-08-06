import React from 'react';
import TopMnu from './TopMnuSettings';

//import options from '../data/options';

import './css/Settings.css';

 /* {settings, setSettings, gotoBack} */

 // settings:  {countRepeat: 1, speed: 1, ratePause: 1.4, metod: 'demand'}  // "demand"/"all"/"repeat"
    
 
class Settings extends React.Component {
  
  constructor(props) {
    super(props);
    this.handlerOnChange = this.handlerOnChange.bind(this);
  }

  handlerOnChange (e) {
    console.dir(e.target);
  }


  render() {
    const {gotoBack, settings} = this.props;

    return (
      <div className="settings">
        <TopMnu gotoBack={gotoBack} />
        <form className="items">
          <label>
            Число повторений одного блока
            <input type="text" name="countRepeat" value={settings.countRepeat} 
                  onChange={this.handlerOnChange} required />
          </label>
          <label>
            Скорость воспроизведения
            <input type="text" name="speed" value={settings.speed} 
                  onChange={this.handlerOnChange} required />
          </label> 
          <label>
            Относительная длительность пауз
            <input type="text" name="ratePause" value={settings.ratePause}
                  onChange={this.handlerOnChange} required />            
          </label>                    
          <label>
            Метод повторений
            <input type="text" name="metod" value={settings.metod} 
                  onChange={this.handlerOnChange} required />
          </label>  
          
        </form>
      </div>
    );
  }
}
  
  

export default Settings;
