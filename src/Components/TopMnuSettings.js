import React from 'react';

import {TopMnu, TopMnuItem} from './TopMnu';

import back from './img/back.png';
import def from './img/default.png';


const TopMnuSettings = ({setDefSettings, gotoBack}) => (
  <TopMnu>
      <TopMnuItem img={back} alt="home" onClick={gotoBack} />
      <TopMnuItem img={def} alt="home" onClick={setDefSettings} />
  </TopMnu>
);


export default TopMnuSettings;
