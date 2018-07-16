import React from 'react';
import './css/Start.css';

const Start = (props) => (
  <div className="StartUl">
    <ul>
      { props.files.map((file, index) =>
          <li key={file.name} onClick={(e) => props.selectDialog(index)}>{file.name}</li>)
      }
    </ul>
  </div>
);

export default Start;
