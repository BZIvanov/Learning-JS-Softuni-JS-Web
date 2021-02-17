const fs = require('fs');
const path = require('path');

function getContentType(url) {
  if (url.endsWith('.css')) {
    return 'text/css';
  } else if (url.endsWith('.ico')) {
    return 'image/x-icon';
  } else if (url.endsWith('.png')) {
    return 'image/png';
  } else if (url.endsWith('.jpg') || url.endsWith('.jpeg')) {
    return 'image/jpeg';
  }
}

module.exports = (req, res) => {
  const baseURL = 'http://' + req.headers.host + '/';
  req.pathname = req.pathname || new URL(req.url, baseURL).pathname;

  if (req.pathname.startsWith('/content/') && req.method === 'GET') {
    const filePath = path.normalize(path.join(__dirname, `..${req.pathname}`));

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('Resource not found!');
        res.end();
        return;
      }

      res.writeHead(200, {
        'Content-Type': getContentType(req.pathname),
      });
      res.write(data);
      res.end();
    });
  } else {
    return true;
  }
};
