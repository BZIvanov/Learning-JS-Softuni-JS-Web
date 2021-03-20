const http = require('http');
const url = require('url');

const server = http.createServer(frontController);

function frontController(req, res) {
  req.path = url.parse(req.url).pathname;

  if (req.method === 'POST') {
    let body = '';
    // 'data' is event for the on method and it is called many times as long as we keep on receiving data
    req.on('data', (data) => {
      body += data;
    });
    // 'end' is event for the on method and it is called once we received all the data
    req.on('end', () => {
      console.log(body);
      // respond has to be ended here in the callback, because stream methods are asynchronous
      res.end();
    });
  }
}

const port = 3000;
server.listen(port, () => console.log(`Listening on port ${port}...`));
