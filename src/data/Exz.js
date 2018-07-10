import React from 'react';

const Exz = (props) => (
  <div dangerouslySetInnerHTML={createMarkup(props.data)} />
);

function createMarkup(data) {
  console.log(data);
  return {__html: '<div> data </div> <div> data2 </div>'};
}

export default Exz;