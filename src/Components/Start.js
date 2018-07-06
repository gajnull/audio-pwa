import React from 'react';
import './Start.css';

const Start = (props) => (
  <ul className="StartUl">
    { props.files.map((file, index) =>
        <li key={file.name} onClick={(e) => props.selectDialog(index)}>{file.name}</li>)
    }
  </ul>
);

export default Start;