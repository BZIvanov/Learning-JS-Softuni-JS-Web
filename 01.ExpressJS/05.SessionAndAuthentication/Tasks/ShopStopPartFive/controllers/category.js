const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
  res.render('category/add');
};

module.exports.addPost = async (req, res) => {
  const { name } = req.body;
  const category = { name };
  category.creator = req.user._id;

  try {
    await Category.create(category);
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

module.exports.productByCategory = async (req, res) => {
  const { category: categoryName } = req.params;

  try {
    const category = await Category.findOne({ name: categoryName }).populate(
      'products'
    );
    if (!category) {
      return res.sendStatus(404);
    }

    res.render('category/products', { category });
  } catch (err) {
    console.log(err);
  }
};
