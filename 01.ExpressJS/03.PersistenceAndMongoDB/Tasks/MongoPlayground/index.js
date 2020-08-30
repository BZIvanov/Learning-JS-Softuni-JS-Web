const http = require('http');
const url = require('url');
const qs = require('querystring');
const handlers = require('./handlers');

require('./config/db')();

const port = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    req.pathname = url.parse(req.url).pathname;
    req.pathquery = qs.parse(url.parse(req.url).query);
    for (const handler of handlers) {
      if (!handler(req, res)) {
        break;
      }
    }
  })
  .listen(port, () => console.log('Server listening on port ' + port));
