const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const database = require('../database');

module.exports = (req, res) => {
  // we will add pathname property to the req object
  req.pathname = req.pathname || url.parse(req.url).pathname;

  if (req.pathname === '/' && req.method === 'GET') {
    // normalize method removes dots from the path and double slashes etc.
    // __dirname is a global variable which is the path to the module. Console.log it anywhere to see example
    const filePath = path.normalize(
      path.join(__dirname, '../views/home/index.html')
    );

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          // content type for internet search use mime types
          'Content-Type': 'text/plain',
        });

        res.write('404 not found');
        res.end();
        return;
      }

      // query is property in the object returned from url.parse. And we need to provide query to the querystring module to be parsed. We dont have to provide the whole url, just the query
      const queryData = qs.parse(url.parse(req.url).query);
      //console.log(queryData)

      let products = database.products.getAll();
      if (queryData.query) {
        products = products.filter((product) => {
          return product.name
            .toLowerCase()
            .includes(queryData.query.toLowerCase());
        });
      }

      let content = '';
      for (const product of products) {
        content += `<div class="product-card">
                    <img class="product-img" src="${product.image}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                </div>`;
      }

      const html = data.toString().replace('{content}', content);

      res.writeHead(200, {
        'Content-Type': 'text/html',
      });

      res.write(html);
      res.end();
    });
  } else {
    return true;
  }
};
