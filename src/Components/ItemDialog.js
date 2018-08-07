import React from 'react';

const style = {
  fontSize: '1.4em',
  color: 'grey',
  lineHeight: '1.1em'
};

const styleActive = {
  ...style,
  fontSize: '2em',
  color: 'black'
};

const ItemDialog = ({txt, active, onClick}) => {

  const styleItem = active ? styleActive : style;

  return (
    <span  dangerouslySetInnerHTML = {{__html: txt}} style={styleItem} onClick={onClick} />
  );

}

export default ItemDialog;
