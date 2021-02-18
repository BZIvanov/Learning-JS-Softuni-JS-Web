const fs = require('fs');
const path = require('path');
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
  // with the req.file we can see info about the image we are uploading
  productObj.image = '\\' + req.file.path;
  productObj.creator = req.user._id;

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

    if (
      product.creator.equals(req.user._id) ||
      req.user.roles.indexOf('Admin') >= 0
    ) {
      const categories = await Category.find();
      res.render('product/edit', {
        product,
        categories,
      });
    } else {
      return res.redirect(
        `/?error=${encodeURIComponent(
          'You do not have rights to edit this product!'
        )}`
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.editPost = async (req, res) => {
  const editedProduct = { ...req.body };

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.redirect(
      `/?error=${encodeURIComponent('Product was not found!')}`
    );
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

    if (product.category.toString() !== editedProduct.category) {
      const currentCategory = await Category.findById(product.category);
      const nextCategory = await Category.findById(editedProduct.category);

      const index = currentCategory.products.indexOf(product._id);
      currentCategory.products.splice(index, 1);
      await currentCategory.save();

      nextCategory.products.push(product._id);
      await nextCategory.save();

      product.category = editedProduct.category;
    }

    await product.save();
    res.redirect(
      `/?success=${encodeURIComponent('Product was edited successfully!')}`
    );
  } else {
    res.redirect(
      `/?error=${encodeURIComponent(
        'You are not allowed to edit this product!'
      )}`
    );
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
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const creator = req.user._id;

  const filter = {
    _id: id,
  };
  if (req.user.roles.indexOf('Admin') === -1) {
    filter.creator = creator;
  }

  try {
    const removedProduct = await Product.findOneAndDelete(filter);
    await Category.updateOne(
      { _id: removedProduct.category },
      { $pull: { products: removedProduct._id } }
    );

    const imagePath = path.join(__dirname, '..', removedProduct.image);
    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.log('Delete error', err);
        return res.sendStatus(404);
      }

      const boughtProductsIndex = req.user.boughtProducts.indexOf(id);
      const createdProductsIndex = req.user.createdProducts.indexOf(id);
      if (boughtProductsIndex > -1) {
        req.user.boughtProducts.splice(boughtProductsIndex, 1);
      }
      if (createdProductsIndex > -1) {
        req.user.createdProducts.splice(createdProductsIndex, 1);
      }

      await req.user.save();
      res.redirect(
        `/?success=${encodeURIComponent('Product was deleted successfully!')}`
      );
    });
  } catch (err) {
    console.log(err);
    res.redirect(
      `/?error=${encodeURIComponent('Product deletion has failed!')}`
    );
  }
};

module.exports.buyGet = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.redirect(
        `/?error=${encodeURIComponent('Product was not found!')}`
      );
    }

    if (product.buyer) {
      return res.redirect(
        `/?error=${encodeURIComponent('Product was already bought!')}`
      );
    }

    res.render('product/buy', { product });
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

module.exports.buyPost = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (product.buyer) {
      return res.redirect(
        `/?error=${encodeURIComponent('Product was already bought!')}`
      );
    }

    product.buyer = req.user._id;
    await product.save();
    req.user.boughtProducts.push(id);
    await req.user.save();

    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};
