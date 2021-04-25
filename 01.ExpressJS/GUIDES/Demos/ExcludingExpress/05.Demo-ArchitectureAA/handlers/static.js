const fs = require('fs');

const mimeTypes = {
  css: 'text/css',
  js: 'application/javascript',
  png: 'image/png',
};

function staticHandler(req, res) {
  if (req.path.startsWith('/static/')) {
    // for example path like static/style.css we get the extension name with the row below
    const extension = req.path.split('.').pop();
    res.writeHead(200, {
      'content-type': mimeTypes[extension],
    });
    fs.readFile('.' + req.path, 'utf8', (err, data) => {
      if (err) {
        res.write(err);
        res.end();
        return;
      }

      res.write(data);
      res.end();
    });
  } else {
    return true;
  }
}

module.exports = staticHandler;
