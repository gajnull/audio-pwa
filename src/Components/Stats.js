import React from 'react';
import {TopMnu, TopMnuItem} from './TopMnu';
import dataStats from '../data/dataStats';
import home from './img/home.png';
import clean from './img/clean.png';
import './css/Stats.css';

const Stats = (props) => {
  const {countRuns, workingTime, countDialogs} = dataStats.getStats();
  const time = dataStats.formatPeriod(workingTime);
  return (
    <div id="StatsUl">
      <TopMnu>
          <TopMnuItem img={home} alt="home" onClick={props.gotoStart} />
          <TopMnuItem img={clean} alt="clean" onClick={props.gotoStart} />
      </TopMnu>
      <div className="title"> Статистика использования </div>
      <Item name="Количество запусков приложения: " value={countRuns} />
      <Item name="Общее время работы с диалогами: " value={time} />
      <Item name="Количество проработанных диалогов: " value={countDialogs} />
    </div>
  );
}

const Item = (item) => (
  <div className="item">
    <div className="name">{item.name} </div>
    <div className="value">{item.value} </div>
  </div>
);


export default Stats;
