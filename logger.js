"use strict"; 

const eventHub = require('./hub');
const net = require('net');
const client = new net.Socket();

const PORT = process.env.PORT || 3001;

client.connect(PORT, 'localhost', () => {

})


eventHub.on('save', file => {
  console.log(`Record ${file} was saved!`)});

eventHub.on('error', err => {
  console.error('Something went wrong.', err)
});