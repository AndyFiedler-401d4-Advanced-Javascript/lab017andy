'use strict'; 

// In-process event listener logger

const eventHub = require('./hub');

eventHub.on('save', file => {
  console.log(`Record ${file} was saved!`);});

eventHub.on('error', err => {
  console.error('Something went wrong.', err);
});