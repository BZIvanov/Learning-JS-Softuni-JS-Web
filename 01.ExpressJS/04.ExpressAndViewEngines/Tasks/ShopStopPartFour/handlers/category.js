const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
  res.render('category/add');
};

module.exports.addPost = (req, res) => {
  const { name } = req.body;
  Category.create({ name }).then(() => {
    res.redirect('/');
  });
};

module.exports.productByCategory = (req, res) => {
  const { category } = req.params;

  Category.findOne({ name: category })
    .populate('products')
    .then((category) => {
      if (!category) {
        res.sendStatus(404);
        return;
      }
      res.render('category/products', { category });
    });
};
