const path = 'data/';
let data = [];
let transl = [];


const loadLngt = (file) => {
  return fetch(path + file).then(response => response.json())
          .then(json => data = json)
          .catch( err => err );
}

const loadTransl = (file) => {
  return fetch(path + file).then(response => response.json())
          .then(json => transl = json).then(() => getTransl())
          .catch( err => err );
};


const getItems = (poz = 0) => {
  var before = "",
      current = "",
      after = "",
      _from = 0,
      _to = 0;

  if (data.length !== 0) {
    current = data[poz].txt;
    _from = data[poz].from;
    _to = data[poz].to;

    before = (poz === 0) ? "" : data[poz - 1].txt;
    after = (poz === data.length - 1) ? "" : data[poz + 1].txt; // если текущий элемент - последний в массиве
  }
  return { before, current, after, _from, _to }
};

const getTransl = (poz = 0) => {
  return (transl.length === 0) ? null : transl[poz];
};

const isLastPoz = (poz = 0) => {
  if (poz === data.length - 1) return true;
  return false;
};

const getAllItems = (kind = 'fullOrigin') => {
  let fullData = [];
  if (kind = 'fullOrigin') {
    fullData = data;
    
  }
  if (kind = 'fullTransl') {
    fullData = data.map((item, index) => {
      return {txt: transl[index], value: item.txt , ...item};  
    });
  }
  return fullData;
}


const unload = () => {
  data = [];
  transl = [];
}



export default {
  loadLngt,
  loadTransl,
  getItems,
  getTransl,
  isLastPoz,
  unload
};
