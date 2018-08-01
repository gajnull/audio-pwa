import React from 'react';
import Back from './img/back.png';

const divStyle = {
  flex: '1',
  backgroundColor: '#222',
  color: 'white',
  minWidth: '0',
  borderRight: '2px solid grey',
  textAlign: 'center'
};


const TopMnu = ({gotoBack}) => {

  return (
    <div style={{display:'flex', width:'100%', height:'40px'}}>
        <div style={divStyle} onClick={gotoBack} >
          <img src={Back} style={{height:'100%'}} alt="Назад" />
        </div>
    </div>
  );

};

export default TopMnu;
