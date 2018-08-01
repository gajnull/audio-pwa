import React from 'react';
import TopMnu from './TopMnuSettings';
import './css/Settings.css';

const Settings = ({settings, gotoBack, setSpeed, setPause, setVolume, setRepaet}) => {
  return (
    <div className="Settings">
      <TopMnu gotoBack={gotoBack}/>
      <div className="items">
        <div>
          <span>settings</span>
          <span>{settings}</span>
        </div>
      </div>    
    </div>
  );
}


export default Settings;