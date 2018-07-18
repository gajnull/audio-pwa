import React from 'react';
import Demand from './img/play-one.png';
import All from './img/play-in-series.png';
import Repeat from './img/repeat.png';
import PlayInfo from './img/play-info.png';
import PauseInfo from './img/pause-info.png';

const btnStyle = {
  flex: '1',
  backgroundColor: '#222',
  color: 'white',
  borderLeft: '2px solid grey',
  padding: '7px 0px',
  minWidth: '0'
};

const activeBtnStyle = {
  ... btnStyle,
  backgroundColor: '#666'
};

  // props = {curMetod, isDialog, setMetod, tooglePlay}
const BottomMnu = (props) => {

  return (
    <div style={{display:'flex', width:'100%', height:'40px'}}>
      {item({...props, img: PlayOne, metod: 'demand', first: true})}
      {item({...props, img: Play, metod: 'all'})}
      {item({...props, img: Repeat, metod: 'repeat'})}



    </div>
  );

};


const item = ({activeMetod, metod, setMetod, first}) => {
  let style = (activeMetod === metod) ? activeBtnStyle : btnStyle;
  if(first) style.borderStyle = 'none';
  const src = metod[0].toUpperCase() + metod.slice(1);
  return (
    <div style={style} onClick={setMetod.bind(null, metod)} >
      <img src={PlayOne} style={{height:'100%'}} alt={metod} />
    </div>
  );
};


export default BottomMnu;

// <div style={{...divStyle, borderStyle:'none'}} onClick={(e) => play('one')} >
//   <img src={PlayOne} style={{height:'100%'}} alt="Одноразово" />
// </div>
// <div style={divStyle}  onClick={(e) => play('in-series')}>
//   <img src={Play} style={{height:'100%'}} alt="Непрерывно" />
// </div>
// <div style={divStyle}  onClick={(e) => play('in-series')}>
//   <img src={Play} style={{height:'100%'}} alt="Непрерывно" />
// </div>
//
// <div style={divStyle}>
//   <div> ... </div>
// </div>
