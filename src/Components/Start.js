import React from 'react';
import {TopMnu, TopMnuItem} from './TopMnu';
import statistics from './img/statistics.png';
import './css/Start.css';

const Start = ({files, selectDialog, gotoStats}) => (

  <div className="StartUl">
    <TopMnu>
      <TopMnuItem img={statistics} alt="Statistics" onClick={gotoStats} />
    </TopMnu>    
    <ul>
      { files.map((file, index) =>
          <li key={file.name} onClick={(e) => selectDialog(index)}>{file.name}</li>)
      }
    </ul>
  </div>
);

export default Start;
