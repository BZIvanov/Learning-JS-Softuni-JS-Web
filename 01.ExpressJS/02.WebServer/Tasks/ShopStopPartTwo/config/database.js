const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '/database.json');

function getProducts() {
  if (fs.existsSync(dbPath) === false) {
    fs.writeFileSync(dbPath, '[]');
    return [];
  }

  const json = fs.readFileSync(dbPath).toString() || '[]';
  return JSON.parse(json);
}

function saveProducts(products) {
  const json = JSON.stringify(products);
  fs.writeFileSync(dbPath, json);
}

// first create products empty object and below attach functions to the empty object working with the array
module.exports.products = {};

module.exports.products.getAll = getProducts;

module.exports.products.add = (product) => {
  const products = getProducts();
  product.id = products.length + 1;
  products.push(product);
  saveProducts(products);
};

module.exports.products.findByName = (name) => {
  return getProducts().filter((p) => p.name.toLowerCase().includes(name));
};
