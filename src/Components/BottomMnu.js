import React from 'react';
import PlayOne from './img/play-one.png';
import Play from './img/play-in-series.png';

const divStyle = {
  flex: '1',
  backgroundColor: '#222',
  color: 'white',
  borderRight: '2px solid grey',
  padding: '7px 0px',
  minWidth: '0'
};

const BottomMnu = ({play}) => {

  return (
    <div style={{display:'flex', width:'100%', height:'40px'}}>
      <div style={divStyle} onClick={(e) => play('one')} >
        <img src={PlayOne} style={{height:'100%'}} alt="Одноразово" />
        </div>
      <div style={divStyle}  onClick={(e) => play('in-series')}>
        <img src={Play} style={{height:'100%'}} alt="Непрерывно" />
      </div>
      <div style={{...divStyle, borderStyle:'none'}}>
        <div> ... </div>
      </div>
    </div>
  );

}

export default BottomMnu;
