import React from 'react';
import './css/TopMnu.css';

const TopMnu = (props) => (
  <div className="mnu">
    {props.children}
  </div>
);

const TopMnuItem = (props) => (
  <div className="mnu-item" onClick={props.onClick} >
    <img src={props.img} alt={props.alt} />
  </div>
);

const TopMnuItemText = ({title}) => (
  <div className="mnu-item" >
    <span> {title} </span>
  </div>
);


export {TopMnu, TopMnuItem, TopMnuItemText};
