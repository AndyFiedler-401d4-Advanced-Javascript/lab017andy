'use strict';

//do i even need the hub import??
// const hub = require('./hub');


const fs = require('fs');
const uuid = require('uuid');

require('../logger');
require('./network-logger');
require('./cache-invalidator');


const eventHub = require('./event');
const {promisify} = require('util');

const readFileProm = promisify(fs.readFile);

const writeFileProm = promisify(fs.writeFile);


const alterFile = (file) => {
  readFileProm(file)
  .then(data => {
    let text = data.toString().toUpperCase();
    return writeFileProm(file, Buffer.from(text))
  })
  .then(() => {
    console.log(text);
    console.log(`${file} saved`);
    eventHub.emit('save', file);
  })
  .catch(error => {
    eventHub.emit('error', error)
  })
};


  // Don't save until we're probably connected
setInterval(() => {
  saveToDb({ name: uuid() });
}, 500);

const { saveToDb } = require('./db');

let file = process.argv.slice(2).shift();
alterFile(file);