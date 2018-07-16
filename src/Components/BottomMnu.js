import React from 'react';
import PlayOne from './img/play-one128_2.png';
//import Play from './img/play128.png';
import Play from './img/uu.png';

const divStyle = {
  flex: '1',
  backgroundColor: '#222',
  color: 'white',
  borderRight: '2px solid grey',
  padding: '7px 0px',
  minWidth: '0'
};

const BottomMnu = () => {

  return (
    <div style={{display:'flex', width:'100%', height:'40px'}}>
      <div style={divStyle} >
        <img src={PlayOne} style={{height:'100%'}} alt="Одноразово" />
        </div>
      <div style={divStyle} >
        <img src={Play} style={{height:'100%'}} alt="Непрерывно" />
      </div>
      <div style={{...divStyle, borderStyle:'none'}}>
        <div> ... </div>
      </div>
    </div>
  );

}

export default BottomMnu;
