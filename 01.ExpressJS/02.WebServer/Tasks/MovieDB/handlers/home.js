const fs = require('fs');

module.exports = (req, res) => {
  if (
    (req.pathname === '/' || req.pathname === '/index.html') &&
    req.method === 'GET'
  ) {
    fs.readFile('./views/home.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('404 Not found!');
        res.end();
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      res.write(data);
      res.end();
    });
  } else {
    return true;
  }
};
