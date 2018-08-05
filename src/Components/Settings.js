import React from 'react';
import TopMnu from './TopMnuSettings';
import './css/Settings.css';

const Settings = ({settings, setSettings, gotoBack}) => {
  return (
    <div className="Settings">
      <TopMnu gotoBack={gotoBack}/>
      <div className="items">
        <div>
          <span>settings</span>
          <span>{settings.countRepeat}</span>
        </div>
      </div>
    </div>
  );
}


export default Settings;
