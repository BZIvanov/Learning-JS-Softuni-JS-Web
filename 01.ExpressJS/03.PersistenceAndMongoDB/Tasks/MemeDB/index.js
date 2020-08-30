const http = require('http');
const url = require('url');
const handlers = require('./handlers');
const db = require('./config/dataBase');
const port = 3000;

db.load()
  .then(() => {
    console.log('testing');
    http
      .createServer((req, res) => {
        for (const handler of handlers) {
          req.pathname = url.parse(req.url).pathname;
          const task = handler(req, res);
          if (!task) {
            break;
          }
        }
      })
      .listen(port);
    console.log('Server listening on port ' + port);
  })
  .catch(() => {
    console.log('Failed to load DB');
  });
