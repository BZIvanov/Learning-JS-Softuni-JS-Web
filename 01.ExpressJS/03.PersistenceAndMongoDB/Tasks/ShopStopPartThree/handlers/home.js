const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const Product = require('../models/Product');

module.exports = (req, res) => {
  const baseURL = 'http://' + req.headers.host + '/';
  req.pathname = req.pathname || new URL(req.url, baseURL).pathname;

  if (req.pathname === '/' && req.method === 'GET') {
    const filePath = path.normalize(
      path.join(__dirname, '../views/home/index.html')
    );

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('404 not found');
        res.end();
        return;
      }

      const queryData = qs.parse(new URL(req.url, baseURL).search);
      Product.find().then((products) => {
        if (queryData['?query']) {
          products = products.filter((product) =>
            product.name
              .toLowerCase()
              .includes(queryData['?query'].toLowerCase())
          );
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
    });
  } else {
    return true;
  }
};
