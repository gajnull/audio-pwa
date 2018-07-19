import React from 'react';
import TopMnu from './TopMnuStart';
import './css/Start.css';

const Start = ({files, selectDialog, showStatistics, setSettings}) => (

  <div className="StartUl">
    <TopMnu setSettings={setSettings} showStatistic={showStatistics} />
    <ul>
      { files.map((file, index) =>
          <li key={file.name} onClick={(e) => selectDialog(index)}>{file.name}</li>)
      }
    </ul>
  </div>
);

export default Start;
