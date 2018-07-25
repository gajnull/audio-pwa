const model = {}

// .then()
model.loadLngt = (path) => {
  return new Promise( (resolve, reject) => {
    fetch(path)
      .then( response => {
        return response.text();
      })
      .then(function(txt) {
        //const data = document.createDocumentFragment();
        const elem = document.createElement('DIV');
        elem.innerHTML = txt; // нужно из-за дальнейшего применения textContent
        const data = extractData(elem);
        resolve(data);
      })
      .catch( err => {
        reject(err);
      });
    });
};

model.getItems = (data = [], poz = 0) => {
  var before = "",
      current = "",
      after = "",
      _from = 0,
      _to = 0;

  if (data.length !== 0) {
    current = data[poz].txt;
    _from = data[poz]._from;
    _to = data[poz]._to;

    before = (poz === 0) ? "" : data[poz - 1].txt;
    after = (poz === data.length - 1) ? "" : data[poz + 1].txt; // если текущий элемент - последний в массиве
  }
  return { before, current, after, _from, _to }
};

model.isLastPoz = (data = [], poz = 0) => {
  if (poz === data.length - 1) return true;
  return false;
}



function extractData(elem) {
  const spans = elem.querySelectorAll('span[from][to]');
  const data = [];
  spans.forEach( span => {
    data.push({txt: span.innerHTML, //textContent,
              _from: span.getAttribute('from'),
              _to: span.getAttribute('to') });
  });
  return data;
}

export default model;
