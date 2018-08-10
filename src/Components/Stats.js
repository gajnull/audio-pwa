import React from 'react';
import {TopMnu, TopMnuItem} from './TopMnu';
import * as statistic from '../data/statistic';
import home from './img/home.png';
import './css/Stats.css';

const Stats = ({gotoStart}) => (
  <div id="StatsUl">
    <TopMnu>
        <TopMnuItem img={home} alt="home" onClick={gotoStart} />
    </TopMnu>
    <div className="title"> Статистика использования </div>
    <div style={{fontWeight: 'bold'}} > (Пока не отсеживается!!!) </div>
    {
      statistic.getData().map((item) => (
        <Item key={item.name} item={item} />
      ))
    }
  </div>
);


const Item = ({item}) => (
  <div className="item">
    <div className="name">{item.name} </div>
    <div className="value">{item.value} </div>  
  </div>
);


export default Stats;
