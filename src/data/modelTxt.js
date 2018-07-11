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
        elem.innerHTML = txt.replace(/__/g, "--").replace(/<br>/g, "__");
        const data = extractData(elem)
        resolve(data);
      })
      .catch( err => {
        reject(err);
      });
    });
};

model.getItems = (data, poz) => (
  {
    before: data[poz-1],
    current: data[poz],
    after: data[poz+1]
  });


function extractData(elem) {
  const spans = elem.querySelectorAll('span');
  const data = [];
  spans.forEach( span => {
    if (span.hasAttributes('from')) {
      data.push({txt: span.textContent,
                _from: span.hasAttributes('from'),
                _to: span.hasAttributes('to') });
    }
  });
  return data;
}

export default model;
