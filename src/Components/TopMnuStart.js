import React from 'react';
import Statistics from './img/statistics.png';
import Settings from './img/settings.png';

const divStyle = {
  flex: '1',
  backgroundColor: '#222',
  color: 'white',
  minWidth: '0',
  borderRight: '2px solid grey',
  textAlign: 'center'
};


const TopMnu = ({showStatistics, setSettings}) => {

  return (
    <div style={{display:'flex', width:'100%', height:'40px'}}>
        <div style={divStyle} onClick={showStatistics} >
          <img src={Statistics} style={{height:'100%'}} alt="Назад" />
        </div>
        <div style={{...divStyle, borderStyle:'none'}} onClick={setSettings} >
          <img src={Settings} style={{height:'100%'}} alt="Настройки" />
        </div>
    </div>
  );

};

export default TopMnu;
