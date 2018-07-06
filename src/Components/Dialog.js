import React from 'react';
import './Dialog.css';

const Dialog = (props) => (
  <div className="Dialog" onClick={props.gotoStart}>
    <p> Index: {props.ind} </p>
    <p> file.name: {props.file.name} </p>
    <p> file.txt: {props.file.txt} </p>
    <p> file.audio: {props.file.audio} </p>
  </div>
);

export default Dialog;
