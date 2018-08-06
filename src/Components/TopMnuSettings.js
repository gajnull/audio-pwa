import React from 'react';

import {TopMnu, TopMnuItem, TopMnuItemText} from './TopMnu';

import back from './img/back.png';


const TopMnuSettings = ({gotoBack}) => (
  <TopMnu>
      <TopMnuItem img={back} alt="home" onClick={gotoBack} />
      <TopMnuItemText title="Установки" />
  </TopMnu>
);


export default TopMnuSettings;
