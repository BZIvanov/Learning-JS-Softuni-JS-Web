const fs = require('fs');

const fileType = (dataString) => {
  const dataTypes = {
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.ico': 'image/x-icon',
  };
  for (const type in dataTypes) {
    if (dataString.endsWith(type)) {
      return dataTypes[type];
    }
  }
};

const favHandler = (req, res) => {
  fs.readFile('./public/images/favicon.ico', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.writeHead(200, {
      'Content-Type': fileType(req.pathname),
    });

    res.write(data);
    res.end();
  });
};

const resData = (req, res) => {
  fs.readFile('.' + req.pathname, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      'Content-Type': fileType(req.pathname),
    });
    res.write(data);
    res.end();
  });
};

module.exports = (req, res) => {
  if (req.pathname === '/favicon.ico' && req.method === 'GET') {
    favHandler(req, res);
  } else if (req.pathname.startsWith('/public/') && req.method === 'GET') {
    resData(req, res);
  } else {
    res.write('404');
    res.end();
  }
};
