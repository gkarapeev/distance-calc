const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;

const contentTypes = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/xicon',
  '.png': 'image/png'
};

const serverFunction = function (request, response) {
  const url = request.url === "/" ? '/index.html' : request.url ;
  const ext = path.extname(url);
  
  fs.readFile('public' + url, function (err, data) {
    if (err) console.log(err);

    response.writeHead(200, { 'Content-Type': contentTypes[ext] });
    response.write(data);
    response.end();
  });
};

const server = http.createServer(serverFunction);

const listenFunction = function (error) {
  if (error) {
    console.log('Something went wring', error);
  }

  console.log('Node.js server is active and listening on port ' + port);
};

server.listen(port, listenFunction);
