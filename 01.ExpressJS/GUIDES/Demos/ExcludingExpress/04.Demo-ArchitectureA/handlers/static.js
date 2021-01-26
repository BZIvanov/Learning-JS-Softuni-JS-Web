// in this file we use fs module so we have to import it here as well
const fs = require('fs');

function staticHandler(req, res) {
  // here we will work with the files in folder static. The path property on the request is the same we attached to the request object in the file server.js
  if (req.path.startsWith('/static/')) {
    if (req.path.endsWith('.css')) {
      res.writeHead(200, {
        'content-type': 'text/css',
      });
    } else if (req.path.endsWith('.js')) {
      res.writeHead(200, {
        'content-type': 'application/javascript',
      });
    }
    // dot before the path is necesseary to let know we are targeting current folder
    fs.readFile('.' + req.path, 'utf8', (err, data) => {
      res.write(data);
      res.end();
    });
  } else {
    // here return true is important for the server.js file where we check in the loop. The logic is if we return true this handler is not the one we need and the loop will continue
    return true;
  }
}

module.exports = staticHandler;
