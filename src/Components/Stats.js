import React from 'react';
import {TopMnu, TopMnuItem} from './TopMnu';
import statistic from '../data/statistic';
import home from './img/home.png';
import './css/Stats.css';

const Stats = (props) => (

  <div className="StatsUl">
    <TopMnu>
        <TopMnuItem img={home} alt="home" onClick={props.gotoStart} />
    </TopMnu>

    <ul>
      <li>1</li>
    </ul>
  </div>
);

export default Stats;
