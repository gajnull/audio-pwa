import React from 'react';
import Back from './img/back.png';
import Begin from './img/begin.png';
import Settings from './img/settings.png';

const divStyle = {
  flex: '1',
  backgroundColor: '#222',
  color: 'white',
  minWidth: '0',
  borderRight: '2px solid grey',
  textAlign: 'center'
};


const TopMnu = ({gotoStart, gotoBegin, setSettings}) => {

  return (
    <div style={{display:'flex', width:'100%', height:'40px'}}>
        <div style={divStyle} onClick={gotoStart} >
          <img src={Back} style={{height:'100%'}} alt="Назад" />
        </div>
        <div style={divStyle} onClick={gotoBegin} >
          <img src={Begin} style={{height:'100%'}} alt="Настройки" />
        </div>
        <div style={{...divStyle, borderStyle:'none'}} onClick={setSettings} >
          <img src={Settings} style={{height:'100%'}} alt="Настройки" />
        </div>        
    </div>
  );

};

export default TopMnu;
