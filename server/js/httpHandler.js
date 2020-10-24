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
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.url === '/') {
    res.writeHead(200, headers);

    if (req.method === 'OPTIONS') {
      res.end();
    }

    if (req.method === 'GET') {
      //res.end(randomDirection());
      var temp = messageQueue.dequeue();
      res.end(temp);
    }

    next();
  } else {

    console.log('this is being called');
    fs.readFile(req.url, (err, fileData) => {
      if (err) {
        console.log('error');
        res.writeHead(404, headers);
        res.end();

      } else {
        console.log(fileData);

      }
      next();
      // if (err) {
        // res.writeHead(404, headers);
        // res.end();
      // } else {
        // res.writeHead(200, headers);
        // res.end();
      // }
    });  // var file = multipart.getFile(fileData);
    // expect(file.filename).to.equal('water-lg.jpg');
    //next();
  }
   //next(); // invoke next() at the end of a request to help with testing!
};

var randomDirection = () => {
  var directions = ['up', 'down', 'left', 'right'];
  var index = Math.floor(Math.random() * 4);
  return directions[index];
}
