const fs = require('fs');

function aboutHandler(req, res) {
  if (req.path === '/about.html') {
    fs.readFile('./about.html', 'utf8', (err, data) => {
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

module.exports = aboutHandler;
