import React from 'react';

const ItemDialog = (props) => {
  const arr = props.txt.split("__");

  return (
    <span> {arr} </span>
  );
}

export default ItemDialog;