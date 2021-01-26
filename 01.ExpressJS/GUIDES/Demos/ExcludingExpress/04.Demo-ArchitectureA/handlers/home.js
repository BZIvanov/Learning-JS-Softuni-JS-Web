const fs = require('fs');

function homeHandler(req, res) {
  if (req.path === '/' || req.path === '/index.html') {
    fs.readFile('./index.html', 'utf8', (err, data) => {
      res.writeHead(200, {
        'content-type': 'text/html',
      });
      res.write(data);
      res.end();
    });
  } else {
    // here return true is important for the server.js file where we check in the loop. The logic is if we return true this handler is not the one we need and the loop will continue
    return true;
  }
}

module.exports = homeHandler;
