const model = {}

// .then()
model.loadLngt = (path) => {
  return new Promise( (resolve, reject) => {
    fetch(path)
      .then( response => {
        return response.text();
      })
      .then(function(txt) {
        const data = document.createDocumentFragment();          
        //let data = document.createElement('DIV');
        data.innerHTML = txt;
        resolve(data);
      })
      .catch( err => {
        reject(err);
      });
    });
};

export default model;
