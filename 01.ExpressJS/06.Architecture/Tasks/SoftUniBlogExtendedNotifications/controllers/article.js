const Article = require('../models/Article');

module.exports = {
  createGet: (req, res) => {
    res.render('article/create');
  },
  createPost: (req, res) => {
    const { title, content } = req.body;
    const author = req.user._id;
    const user = req.user;

    const article = new Article({ title, content, author });

    article
      .save()
      .then((result) => {
        user.articles.push(result._id);
        return user.save();
      })
      .then(() => {
        req.session.message = 'Successfully added article';
        res.redirect('/');
      })
      .catch(console.error);
  },
  details: (req, res) => {
    const articleId = req.params.articleId;

    Article.findById(articleId)
      .populate('author')
      .then((article) => {
        let isAuthor = false;
        if (req.user) {
          isAuthor = req.user.isAuthor(article);
        }
        res.render('article/details', { article, isAuthor });
      })
      .catch(console.error);
  },
  editGet: (req, res) => {
    const articleId = req.params.articleId;

    Article.findById(articleId)
      .then((article) => {
        res.render('article/edit', article);
      })
      .catch(console.error);
  },
  editPost: (req, res) => {
    const articleId = req.params.articleId;
    let articleBody = req.body;

    Article.findById(articleId)
      .then((article) => {
        article.title = articleBody.title;
        article.content = articleBody.content;
        return article.save();
      })
      .then(() => {
        req.session.message = 'Successfully edited article';
        res.redirect('/');
      })
      .catch(console.error);
  },
  deleteGet: (req, res) => {
    let articleId = req.params.articleId;
    Article.findById(articleId)
      .then((article) => {
        res.render('article/delete', article);
      })
      .catch(console.error);
  },
  deletePost: (req, res) => {
    let articleId = req.params.articleId;
    Article.findById(articleId)
      .then((a) => {
        return Article.deleteOne({ _id: a._id });
      })
      .then(() => {
        req.user.articles = req.user.articles.filter(
          (a) => a.toString() !== articleId
        );
        return req.user.save();
      })
      .then(() => {
        req.session.message = 'Successfully deleted article';
        res.redirect('/');
      })
      .catch(console.error);
  },
};
