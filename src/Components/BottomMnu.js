import React from 'react';
import Demand from './img/play-one.png';
import All from './img/play-in-series.png';
import Repeat from './img/repeat.png';
import Settings from './img/settings.png';


const BottomMnu = ({activeMetod, isSettings, setMetod, gotoSettings}) => {
  return (
    <div style={{display:'flex', width:'100%', height:'40px'}}>
      {item({activeMetod, setMetod, img: Demand, metod: 'demand', first: true})}
      {item({activeMetod, setMetod, img: All, metod: 'all'})}
      {item({activeMetod, setMetod, img: Repeat, metod: 'repeat'})}
      {isSettings ? null : itemSettigs({gotoSettings})}
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

const item = ({activeMetod, setMetod, metod, img, first}) => {
  let style = (activeMetod === metod) ? activeBtnStyle : btnStyle;
  if(first) style = {...style, borderLeftStyle: 'none'};

  return (
    <div style={style} onClick={setMetod.bind(null, metod)} >
      <img src={img} style={{height:'100%'}} alt={metod} />
    </div>
  );
};



const settingsStyle = {
  ...btnStyle,
  backgroundColor: '#244',
};

const itemSettigs = ({gotoSettings}) => {
  return (
    <div style={settingsStyle} onClick={gotoSettings} >
      <img src={Settings} style={{height:'100%'}} alt={'settings'} />
    </div>
  );
}

export default BottomMnu;
