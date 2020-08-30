const fs = require('fs');
const filePath = './public/images/favicon.ico';

const typeChecker = (path) => {
  const supportedTypes = {
    '.css': 'text/css',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
  };

  for (const type in supportedTypes) {
    if (path.endsWith(type)) {
      return supportedTypes[type];
    }
  }
  return true;
};

const getFavicon = (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'imaga/x-icon',
    });
    res.end(data);
  });
};

const getStaticFiles = (req, res) => {
  const resPath = '.' + req.pathname;
  const type = typeChecker(resPath);

  fs.readFile(resPath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.writeHead(200, {
      'Content-Type': type,
    });
    res.end(data);
  });
};

const handler404 = (req, res) => {
  res.writeHead(404, 'Resource not found');
  res.end();
};

module.exports = (req, res) => {
  const resPath = '.' + req.pathname;
  const type = typeChecker(resPath);

  if (req.pathname === '/favicon.ico' && req.method === 'GET') {
    getFavicon(req, res);
  } else if (
    req.pathname.startsWith('/public/') &&
    req.method === 'GET' &&
    type !== true
  ) {
    getStaticFiles(req, res);
  } else {
    handler404(req, res);
  }
};
