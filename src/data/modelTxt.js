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
        const data = document.createElement('DIV');
        data.innerHTML = txt;
        resolve(data);
      })
      .catch( err => {
        reject(err);
      });
    });
};

model.getItems = (data, poz) => {

  let before = "", 
      current = "",
      after = "", 
      _from = "", 
      _to = "";
  
  const items = data.querySelectorAll('span');
  before = items[poz-1].textContent;
  current = items[poz].textContent;
  after = items[poz+1].textContent;

  return {
    before,
    current,
    after,
    _from,
    _to
  }
}

export default model;
