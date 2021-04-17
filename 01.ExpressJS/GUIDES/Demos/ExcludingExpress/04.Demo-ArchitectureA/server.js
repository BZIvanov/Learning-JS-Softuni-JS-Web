const http = require('http');
const url = require('url');

const staticHandler = require('./handlers/static');
const homeHandler = require('./handlers/home');
const aboutHandler = require('./handlers/about');
const errorHandler = require('./handlers/error');

const server = http.createServer(frontController);

function frontController(req, res) {
  // We will attach the path as property to the request object so we can have the path in external files, because request object will be given to the function in external file. Now all logic below will have the path in the request object
  req.path = url.parse(req.url).pathname;

  // in this array it is important the order of elements, for example errorHandler will always return true and will be used if it is first element in the array
  const handlers = [staticHandler, homeHandler, aboutHandler, errorHandler];

  for (let handler of handlers) {
    // we will loop through all handlers and if we find correct match we will execute it and there will be no return and the loop will break. Otherwise if not correct path is found the hanler will return and we will proceed with the next handler
    if (handler(req, res) !== true) {
      break;
    }
  }
}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}...`));
