const fs = require('fs');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
  Category.find().then((categories) => {
    res.render('product/add', { categories });
  });
};

module.exports.addPost = async (req, res) => {
  const productObj = { ...req.body };
  // with the req.file we can see info about the image we are uploading
  productObj.image = '\\' + req.file.path;
  productObj.creator = req.user._id;

  const product = await Product.create(productObj);
  const category = await Category.findById(product.category);
  category.products.push(product._id);
  category.save();
  res.redirect('/');
};

module.exports.editGet = (req, res) => {
  Product.findById(req.params.id).then((product) => {
    if (!product) {
      res.status(404).send('Not found');
      return;
    }

    if (
      product.creator.equals(req.user._id) ||
      req.user.roles.indexOf('Admin') >= 0
    ) {
      Category.find().then((categories) => {
        res.render('product/edit', {
          product,
          categories,
        });
      });
    } else {
      res.redirect(
        `/?error=${encodeURIComponent(
          'You do not have rights to edit this product!'
        )}`
      );
      return;
    }
  });
};

module.exports.editPost = async (req, res) => {
  const editedProduct = { ...req.body };

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
    return;
  }

  if (
    product.creator.equals(req.user._id) ||
    req.user.roles.indexOf('Admin') >= 0
  ) {
    product.name = editedProduct.name;
    product.description = editedProduct.description;
    product.price = editedProduct.price;
    if (req.file) {
      product.image = '\\' + req.file.path;
    }

    // First we check if the category is changed.
    if (product.category.toString() !== editedProduct.category) {
      // If so find the "current" and "next" category.
      Category.findById(product.category).then((currentCategory) => {
        Category.findById(editedProduct.category).then((nextCategory) => {
          const index = currentCategory.products.indexOf(product._id);
          if (index >= 0) {
            // Remove product specified from current category's list of products
            currentCategory.products.splice(index, 1);
          }
          currentCategory.save();
          // Add product's refference to the "new" category.
          nextCategory.products.push(product._id);
          nextCategory.save();

          product.category = editedProduct.category;

          product.save().then(() => {
            res.redirect(
              `/?success=${encodeURIComponent(
                'Product was edited successfully!'
              )}`
            );
          });
        });
      });
    } else {
      product.save().then(() => {
        res.redirect(
          `/?success=${encodeURIComponent('Product was edited successfully!')}`
        );
      });
    }
  } else {
    product.save().then(() => {
      res.redirect(
        `/?success=${encodeURIComponent('Product was edited successfully!')}`
      );
    });
  }
};

module.exports.deleteGet = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
        return;
      }

      if (
        product.creator.equals(req.user._id) ||
        req.user.roles.indexOf('Admin') >= 0
      ) {
        res.render('product/delete', {
          product,
        });
      } else {
        res.redirect(
          `/?error=${encodeURIComponent(
            'You do not have rights to delete this!'
          )}`
        );
        return;
      }
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.deletePost = (req, res) => {
  const id = req.params.id;
  const creator = req.user._id;

  Product.findOneAndDelete({ _id: id, creator }).then((removedProduct) => {
    Category.updateOne(
      { _id: removedProduct.category },
      { $pull: { products: removedProduct._id } }
    )
      .then(() => {
        const imageName = removedProduct.image.split('\\').pop();

        fs.unlink(`./content/images/${imageName}`, (err) => {
          if (err) {
            console.log('Delete error', err);
            res.sendStatus(404);
            return;
          }

          const boughtProductsIndex = req.user.boughtProducts.indexOf(id);
          const createdProductsIndex = req.user.createdProducts.indexOf(id);

          if (boughtProductsIndex > -1) {
            req.user.boughtProducts.splice(boughtProductsIndex, 1);
          }

          if (createdProductsIndex > -1) {
            req.user.createdProducts.splice(createdProductsIndex, 1);
          }

          req.user.save().then(() => {
            res.redirect(
              `/?success=${encodeURIComponent(
                'Product was deleted successfully!'
              )}`
            );
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
      });
  });
};

module.exports.buyGet = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
        return;
      }

      if (product.buyer) {
        res.redirect(
          `/?error=${encodeURIComponent('Product was already bought!')}`
        );
        return;
      }

      res.render('product/buy', {
        product,
      });
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.buyPost = (req, res) => {
  const productId = req.params.id;

  Product.findById(productId).then((product) => {
    if (product.buyer) {
      res.redirect(
        `/?error=${encodeURIComponent('Product was already bought!')}`
      );
      return;
    }

    product.buyer = req.user._id;
    product.save().then(() => {
      req.user.boughtProducts.push(productId);
      req.user.save().then(() => {
        res.redirect('/');
      });
    });
  });
};
