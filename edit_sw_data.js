const fs = require('fs');
const crypto = require('crypto');

const json = require('./build/data/metaData.json');

let str = json.map(item => 
  '"/data/' + item.dir + '/' + item.lngt + '","' + getHash(item.dir+item.lngt) + 
  '"],\n["/data/' + item.dir + '/' + item.transl + '","' + getHash(item.dir+item.transl) +   
  '"],\n["/data/' + item.dir + '/' + item.audio + '","' + getHash(item.dir+item.audio)  
  ).join('"],\n[');  // \n - для красоты

str = 'precacheConfig=[[' + str + '"],[';

let sw = fs.readFileSync('build/service-worker.js', 'utf8');
let res = sw.replace(/precacheConfig=\[\[/, str);

fs.writeFileSync('build/service-worker_new.js', res);

function getHash(str) {
  return crypto.createHash('md5').update(str).digest("hex");
}