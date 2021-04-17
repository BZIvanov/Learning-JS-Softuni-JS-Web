const http = require('http');
const url = require('url');
const fs = require('fs');

// on the row below we only specify folder so by default it will load file called index in the folder
const handlers = require('./handlers');

const server = http.createServer(frontController);

function frontController(req, res) {
  req.path = url.parse(req.url).pathname;

  // sendHtml is our custom function which we will use in handlers to save writing similar code in every handler. We will also use fs module here so we dont need to use it in handlers
  res.sendHtml = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
      res.writeHead(200, {
        'content-type': 'text/html',
      });
      res.write(data);
      res.end();
    });
  };

  for (let handler of handlers) {
    if (handler(req, res) !== true) {
      break;
    }
  }
}

const port = 5000;
server.listen(port, () => console.log(`Listening on port ${port}...`));
