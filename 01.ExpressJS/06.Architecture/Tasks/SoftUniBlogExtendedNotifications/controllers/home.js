const Article = require('../models/Article');

module.exports = {
  index: (req, res) => {
    Article.find()
      .populate('author')
      .then((articles) => {
        const message = req.session.message;
        req.session.message = '';
        res.render('home/index', { articles, message });
      })
      .catch(console.error);
  },
};
