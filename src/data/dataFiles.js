const path = 'data/metaData.json';
let files = null;

// .then()
const loadFiles = (file) => {
  if (files) return Promise.resolve(files);
  return fetch(path)
    .then( response => {
      return response.json();
    })
    .then(function(_files) {
      files = _files;
      return files;
    })
    .catch( err => err );
};


export {
  loadFiles
};
