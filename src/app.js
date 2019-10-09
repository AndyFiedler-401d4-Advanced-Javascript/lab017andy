'use strict';

const fs = require('fs');

require('../logger');
require('../network-logger');

const eventHub = require('../hub');
const {promisify} = require('util');

const readFileProm = promisify(fs.readFile);

const writeFileProm = promisify(fs.writeFile);


const alterFile = (file) => {
  readFileProm(file)
    .then(data => {
      eventHub.emit('read', { file, text: data.toString() });
      let text = data.toString().toUpperCase();
      eventHub.emit('toUpper', { file, text: text });
      return writeFileProm(file, Buffer.from(text));
    })
    .then(() => {
      console.log(`${file} saved`);
      eventHub.emit('save', file);
    })
    .then(() => {
      eventHub.emit('complete');
    })
    .catch(error => {
      eventHub.emit('error', error);
    });
};

let file = process.argv.slice(2).shift();
alterFile(file);
