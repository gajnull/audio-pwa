import React from 'react';
import './css/ItemDialog.css';

const ItemDialog = ({txt, active}) => {
  //const arr = props.txt.split("<br>");
  const nameClass = "item" + (active ? " active" : "");

  return (
    <span  dangerouslySetInnerHTML = {{__html: txt}} className={nameClass} />
  );

}

export default ItemDialog;
