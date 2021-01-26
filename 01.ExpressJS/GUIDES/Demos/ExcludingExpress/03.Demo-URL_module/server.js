const http = require('http');
// load url module which will allow us working with paths from the browser's url bar
const url = require('url');
const fs = require('fs');

const port = 5000;

const server = http.createServer(frontController);

function frontController(req, res) {
  // with url module we can parse the url path from the request and get all its elements as an object. In this from the object we will get the property pathname which is the current path from the request and save it in a variable path
  console.log(url.parse(req.url));
  const path = url.parse(req.url).pathname;

  // if the path is / or /index.html then we return our html file otherwise return the error file. Only one backslash means nothing after the port in the url or just the backslash, any other symbol or text will be incorrect path
  if (path === '/' || path === '/index.html') {
    fs.readFile('./index.html', 'utf8', (err, data) => {
      res.writeHead(200, {
        // content type for internet search use mime types
        'content-type': 'text/html',
      });
      res.write(data);
      res.end();
    });
  } else if (path === '/about.html') {
    // similarly to index.html we can get about.html page by checking the path
    fs.readFile('./about.html', 'utf8', (err, data) => {
      res.writeHead(200, {
        'content-type': 'text/html',
      });
      res.write(data);
      res.end();
    });
  } else if (path === '/site.css') {
    // here this time we get css file not html
    fs.readFile('./site.css', 'utf8', (err, data) => {
      res.writeHead(200, {
        // for css we use txt/css
        'content-type': 'text/css',
      });
      res.write(data);
      res.end();
    });
  } else if (path === '/app.js') {
    // here this time we get js file
    fs.readFile('./app.js', 'utf8', (err, data) => {
      res.writeHead(200, {
        'content-type': 'application/javascript',
      });
      res.write(data);
      res.end();
    });
  } else {
    fs.readFile('./error.html', 'utf8', (err, data) => {
      res.writeHead(404, {
        'content-type': 'text/html',
      });
      res.write(data);
      res.end();
    });
  }
}

server.listen(port, () => console.log(`Listening on port ${port}...`));
