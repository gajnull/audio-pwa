import React from 'react';
import Back from './img/back128.png';
import Settings from './img/settings.png';

const divStyle = {
  flex: '1',
  backgroundColor: '#222',
  color: 'white',
  minWidth: '0',
  borderRight: '2px solid grey'
};


const TopMnu = () => {

  return (
    <div style={{display:'flex', width:'100%', height:'40px'}}>
        <div style={divStyle} >
          <img src={Back} style={{height:'100%'}} alt="Назад" />
        </div>
        <div style={{...divStyle, borderStyle:'none'}} >
          <img src={Settings} style={{height:'100%'}} alt="Настройки" />
        </div>
    </div>
  );

};

export default TopMnu;
