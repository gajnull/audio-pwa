import React from 'react';
import Demand from './img/play-one.png';
import All from './img/play-in-series.png';
import Repeat from './img/repeat.png';
import PlayInfo from './img/play-info.png';
import PauseInfo from './img/pause-info.png';

  // props = {activeMetod, isDialog, isPlay, setMetod, tooglePlay}
const BottomMnu = ({activeMetod, isPlay, isDialog, setMetod}) => {
  return (
    <div style={{display:'flex', width:'100%', height:'40px'}}>
      {item({activeMetod, setMetod, img: Demand, metod: 'demand', first: true})}
      {item({activeMetod, setMetod, img: All, metod: 'all'})}
      {item({activeMetod, setMetod, img: Repeat, metod: 'repeat'})}
      {isDialog ? itemPlay({isPlay}) : null}
    </div>
  );

};


const btnStyle = {
  flex: '1',
  backgroundColor: '#222',
  color: 'white',
  borderLeft: '2px solid grey',
  padding: '7px 0px',
  minWidth: '0'
};

const activeBtnStyle = {
  ...btnStyle,
  backgroundColor: '#666'
};

const item = ({activeMetod, metod, img, setMetod, first}) => {
  const style = (activeMetod === metod) ? {...activeBtnStyle} : {...btnStyle};
  if(first) style.borderLeftStyle = 'none';

  return (
    <div style={style} onClick={setMetod.bind(null, metod)} >
      <img src={img} style={{height:'100%'}} alt={metod} />
    </div>
  );
};


const playStyle = {
  flex: '0.5',
  backgroundColor: '#222',
  color: 'white',
  borderLeft: '2px solid grey',
  padding: '7px 0px',
  minWidth: '15px'
};

const itemPlay = ({isPlay}) => {
  if(isPlay) { playStyle.backgroundColor = '#666'; }
  const img = isPlay ? PauseInfo : PlayInfo;
  return (
    <div style={playStyle} >
      <img src={img} style={{height:'100%'}} alt={img.name} />
    </div>
  );
}

export default BottomMnu;
