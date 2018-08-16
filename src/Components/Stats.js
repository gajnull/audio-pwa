import React from 'react';
import {TopMnu, TopMnuItem} from './TopMnu';
import dataStats from '../data/dataStats';
import home from './img/home.png';
import clean from './img/clean.png';
import './css/Stats.css';

const Stats = ({gotoStart}) => (
  <div id="StatsUl">
    <TopMnu>
        <TopMnuItem img={home} alt="home" onClick={gotoStart} />
        <TopMnuItem img={clean} alt="clean" onClick={gotoStart} />
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

class Stats extends React.Component {

  state = dataStats.getStats();

  constructor(props) {
    super(props);

  }

  render() {
    const {countRuns, workingTime, countDialogs} = this.state;
    //player.settings(settings);
    return ();
  }

}



const Item = ({item}) => (
  <div className="item">
    <div className="name">{item.name} </div>
    <div className="value">{item.value} </div>
  </div>
);


export default Stats;
