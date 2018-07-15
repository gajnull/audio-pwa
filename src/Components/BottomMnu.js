import React from 'react';
import PlayOne from './img/play-one128_2.png';
import Play from './img/play128.png';

const divStyle = {
  flex: '1 1 10px',
  backgroundColor: '#222',
  color: 'white',
  borderRight: '2px solid grey',
  padding: '7px'
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
        <p> ... </p>
      </div>
    </div>
  );

}

export default BottomMnu;
      // <div style={{...divStyle, borderStyle:'none'}}>
