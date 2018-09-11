const path = 'data/';
let data = [];
let transl = [];

// .then()
/*const loadLngt= (file) => {
  return  loadFile(file).then((elem) => {
      data = extractLngt(elem);
      return true;
    });
};*/

const loadLngt = (file) => {
  return fetch(path + file).then(response => response.json())
          .then(json => data = json)
          .catch( err => err );
}

/*
const loadTransl = (file) => {
  return  loadFile(file).then((elem) => {
      transl = extractTransl(elem);
      return getTransl();
    });
};*/

const loadTransl = (file) => {
  return fetch(path + file).then(response => response.json())
          .then(json => transl = json).then(() => getTransl())
          .catch( err => err );
};


/*
function loadFile(file) {
  return fetch(path + file)
    .then( response => {
      return response.text();
    })
    .then(function(content) {
      //const data = document.createDocumentFragment();
      const elem = document.createElement('DIV');
      elem.innerHTML = content; // нужно из-за дальнейшего применения textContent
      return elem;
    })
    .catch( err => err );
}*/
/*
function extractLngt(elem) {
  const spans = elem.querySelectorAll('span[from][to]');
  spans.forEach( span => {
    data.push({txt: span.innerHTML, //textContent,
              _from: span.getAttribute('from'),
              _to: span.getAttribute('to') });
  });
  return data;
}*/
/*
function extractTransl(elem) {
  const spans = elem.querySelectorAll('span[from][to]');
  spans.forEach( span => {
    transl.push(span.innerHTML);
  });
  return transl;
}*/


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
