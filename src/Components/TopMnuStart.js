import React from 'react';

import {TopMnu, TopMnuItem} from './TopMnu';

import statistics from './img/statistics.png';

const TopMnuStart = ({showStatistics}) => (
  <TopMnu>
      <TopMnuItem img={statistics} alt="Statistics" onClick={showStatistics} />
  </TopMnu>
);

export default TopMnuStart;