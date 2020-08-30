const products = [];
let count = 1;

// first create products empty object and below attach functions to the empty object working with the array
module.exports.products = {};

module.exports.products.getAll = () => {
  return products;
};

module.exports.products.add = (product) => {
  product.id = count++;
  products.push(product);
};

module.exports.products.findByName = (name) => {
  let product = null;

  for (const product of products) {
    if (name === product) {
      return product;
    }
  }

  return product;
};
