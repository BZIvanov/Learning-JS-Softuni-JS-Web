const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
  Category.find().then((categories) => {
    res.render('product/add', { categories });
  });
};

module.exports.addPost = async (req, res) => {
  const productObj = { ...req.body };
  productObj.image = req.file.destination + '/' + req.file.filename;

  const product = await Product.create(productObj);
  const category = await Category.findById(product.category);
  category.products.push(product._id);
  await category.save();
  res.redirect('/');
};

module.exports.editGet = (req, res) => {
  const { id } = req.params;
  Product.findById(id).then((product) => {
    if (!product) {
      return res.status(404).send('Not found');
    }

    Category.find().then((categories) => {
      res.render('product/edit', {
        product,
        categories,
      });
    });
  });
};

module.exports.editPost = async (req, res) => {
  const editedProduct = { ...req.body };

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
    return;
  }
  product.name = editedProduct.name;
  product.description = editedProduct.description;
  product.price = editedProduct.price;
  if (req.file) {
    product.image = req.file.destination + '\\' + req.file.originalname;
  }

  // First we check if the category is changed.
  if (product.category.toString() !== editedProduct.category) {
    // If so find the "current" and "next" category.
    Category.findById(product.category).then((currentCategory) => {
      Category.findById(editedProduct.category).then((nextCategory) => {
        let index = currentCategory.products.indexOf(product._id);
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
};

module.exports.deleteGet = (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
        return;
      }

      res.render('product/delete', {
        product,
      });
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.deletePost = (req, res) => {
  const { id } = req.params;

  Product.findByIdAndRemove(id).then((removedProduct) => {
    Category.update(
      { _id: removedProduct.category },
      { $pull: { products: removedProduct._id } }
    )
      .then((result) => {
        let imageName = removedProduct.image.split('\\').pop();

        fs.unlink(`./content/images/${imageName}`, (err) => {
          if (err) {
            console.log(err);
            return res.sendStatus(404);
          }

          res.redirect(
            `/?success=${encodeURIComponent(
              'Product was deleted successfully!'
            )}`
          );
        });
      })
      .catch(() => {
        res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
      });
  });
};

module.exports.buyGet = (req, res) => {
  const { id } = req.params;
  Product.findById(id).then((product) => {
    res.render('product/buy', { product });
  });
};

module.exports.buyPost = (req, res) => {
  const { id } = req.params;

  Product.findById(id).then((product) => {
    if (product.isBought) {
      res.redirect(
        `/?error=${encodeURIComponent('Product was already bought!')}`
      );
      return;
    }

    product.isBought = true;
    product.save().then(() => {
      res.redirect('/');
    });
  });
};
