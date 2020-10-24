const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  res.writeHead(200, headers);

  if (req.method === 'OPTIONS') {
    console.log(res);
    res.end();
  }

  if (req.method === 'GET') {

    // Create an options array
    //helper function
      // Select a random option to be passed into res.end();

    res.end(randomDirection());
  }
  next(); // invoke next() at the end of a request to help with testing!
};

var randomDirection = () => {
  var directions = ['up', 'down', 'left', 'right'];
  var index = Math.floor(Math.random() * 4);
  return directions[index];
}
