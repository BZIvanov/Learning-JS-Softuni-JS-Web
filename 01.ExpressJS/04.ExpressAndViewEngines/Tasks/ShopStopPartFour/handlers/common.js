const Product = require('../models/Product');

module.exports.index = async (req, res) => {
  const { query, success, error } = req.query;

  try {
    let products = await Product.find().populate('category');
    if (query) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    const data = {
      products,
    };
    if (error) {
      data.error = error;
    } else if (success) {
      data.success = success;
    }

    res.render('home/index', {
      ...data,
    });
  } catch (err) {
    console.log(err);
  }
};
