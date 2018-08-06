import React from 'react';

import {TopMnu, TopMnuItem} from './TopMnu';

import home from './img/home.png';
import begin from './img/begin.png';
import playInfo from './img/play-info.png';
import pauseInfo from './img/pause-info.png';



const TopMnuDialog = ({gotoHome, gotoBegin, tooglePlay, isPlay}) => (
  <TopMnu>
      <TopMnuItem img={home} alt="home" onClick={gotoHome} />
      <TopMnuItem img={begin} alt="begin" onClick={gotoBegin} />
      <TopMnuItem img={isPlay? pauseInfo : playInfo} alt="is play" onClick={tooglePlay} />
  </TopMnu>
);

export default TopMnuDialog;
