import React from 'react';
import TopMnu from './TopMnuStart';
import './css/Start.css';

const Start = ({files, selectDialog, showStatistics,
                settings, setSettings, gotoPage}) => (

  <div className="StartUl">
    <TopMnu setSettings={setSettings} showStatistic={showStatistics}
            settings={settings}, back={() => { gotoPage('start') }} />
    <ul>
      { files.map((file, index) =>
          <li key={file.name} onClick={(e) => selectDialog(index)}>{file.name}</li>)
      }
    </ul>
  </div>
);

export default Start;
