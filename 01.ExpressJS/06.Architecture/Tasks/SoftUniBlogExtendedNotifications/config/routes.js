const restrictedPages = require('../config/auth');
const controllers = require('../controllers');

module.exports = (app) => {
  app.get('/', controllers.homeController.index);

  // User routes
  app.get(
    '/user/register',
    restrictedPages.isAnonymous,
    controllers.userController.registerGet
  );
  app.post(
    '/user/register',
    restrictedPages.isAnonymous,
    controllers.userController.registerPost
  );
  app.get(
    '/user/login',
    restrictedPages.isAnonymous,
    controllers.userController.loginGet
  );
  app.post(
    '/user/login',
    restrictedPages.isAnonymous,
    controllers.userController.loginPost
  );
  app.get(
    '/user/logout',
    restrictedPages.isAuthed,
    controllers.userController.logout
  );
  app.get(
    '/user/details',
    restrictedPages.isAuthed,
    controllers.userController.details
  );

  // Article routes
  app.get(
    '/article/create',
    restrictedPages.isAuthed,
    controllers.articleController.createGet
  );
  app.post(
    '/article/create',
    restrictedPages.isAuthed,
    controllers.articleController.createPost
  );
  app.get('/article/details/:articleId', controllers.articleController.details);
  app.get('/article/edit/:articleId', controllers.articleController.editGet);
  app.post('/article/edit/:articleId', controllers.articleController.editPost);
  app.get(
    '/article/delete/:articleId',
    controllers.articleController.deleteGet
  );
  app.post(
    '/article/delete/:articleId',
    controllers.articleController.deletePost
  );
};
