const fs = require('fs');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length < 1) {
      return res.redirect(
        `/?error=${encodeURIComponent(
          'Please create at least 1 category first.'
        )}`
      );
    }

    res.render('product/add', { categories });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addPost = async (req, res) => {
  const productObj = { ...req.body };
  productObj.image = req.file.destination + '/' + req.file.filename;

  try {
    const product = await Product.create(productObj);
    const category = await Category.findById(product.category);
    category.products.push(product._id);
    await category.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

module.exports.editGet = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Not found');
    }

    const categories = await Category.find();
    res.render('product/edit', {
      product,
      categories,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.editPost = async (req, res) => {
  const editedProduct = { ...req.body };

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.redirect(
        `/?error=${encodeURIComponent('Product was not found!')}`
      );
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
      const currentCategory = await Category.findById(product.category);
      const nextCategory = await Category.findById(editedProduct.category);

      const index = currentCategory.products.indexOf(product._id);
      // Remove product specified from current category's list of products
      currentCategory.products.splice(index, 1);
      await currentCategory.save();

      // Add product's refference to the "new" category.
      nextCategory.products.push(product._id);
      await nextCategory.save();

      product.category = editedProduct.category;
      await product.save();
    } else {
      await product.save();
    }

    res.redirect(
      `/?success=${encodeURIComponent('Product was edited successfully!')}`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteGet = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.redirect(
        `/?error=${encodeURIComponent('Product was not found!')}`
      );
    }

    res.render('product/delete', {
      product,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const removedProduct = await Product.findByIdAndRemove(id);

    await Category.updateOne(
      { _id: removedProduct.category },
      { $pull: { products: removedProduct._id } }
    );

    const imageName = removedProduct.image;
    fs.unlink(imageName, (err) => {
      if (err) {
        console.log(err);
        return res.sendStatus(404);
      }

      res.redirect(
        `/?success=${encodeURIComponent('Product was deleted successfully!')}`
      );
    });
  } catch (err) {
    console.log(err);
    res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
  }
};

module.exports.buyGet = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render('product/buy', { product });
  } catch (err) {
    console.log(err);
  }
};

module.exports.buyPost = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (product.isBought) {
      return res.redirect(
        `/?error=${encodeURIComponent('Product was already bought!')}`
      );
    }

    product.isBought = true;
    await product.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};
