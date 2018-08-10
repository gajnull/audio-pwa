import React from 'react';

const styleAround = {
  fontSize: '1.4em',
  color: 'grey',
  lineHeight: '1.1em'
};

const styleActive = {
  fontSize: '2em',
  color: 'black',
  lineHeight: '1.2em'
};

const styleTtranl = {
  fontSize: '1.7em',
  color: 'blue'
};

const ItemDialog = ({txt, active, translate, onClick}) => {

  let style = styleAround;
  if (active) style = styleActive;
  if (translate) style = styleTtranl;

  return (
    <span  dangerouslySetInnerHTML = {{__html: txt}} style={style} onClick={onClick} />
  );

}

export default ItemDialog;
