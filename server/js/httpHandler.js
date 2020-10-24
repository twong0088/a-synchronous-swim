const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue.js');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////


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
    //res.end(randomDirection());
    var temp = messageQueue.dequeue();
    console.log(temp)
    res.end(temp);
  }
  next(); // invoke next() at the end of a request to help with testing!
};

var randomDirection = () => {
  var directions = ['up', 'down', 'left', 'right'];
  var index = Math.floor(Math.random() * 4);
  return directions[index];
}
