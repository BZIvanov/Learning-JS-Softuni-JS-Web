const controllers = require('../controllers');
const multer = require('multer');
const auth = require('./auth');

// this is configuration for multer  storaging file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // here we specify where the file will be saved. The first parameter is for errors
    cb(null, './content/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // the first parameter, which is null is for the errors
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// multer accepts configuration object, where dest property where the files will be stored
let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb max size file
  },
  fileFilter: fileFilter,
});

module.exports = (app) => {
  app.get('/', controllers.home.index);

  app.get('/product/add', auth.isAuthenticated, controllers.product.addGet);
  // the multer upload is a middlware and signle method specify that only 1 file will be provided
  app.post(
    '/product/add',
    auth.isAuthenticated,
    upload.single('image'),
    controllers.product.addPost
  );

  app.get(
    '/product/edit/:id',
    auth.isAuthenticated,
    controllers.product.editGet
  );
  app.post(
    '/product/edit/:id',
    auth.isAuthenticated,
    upload.single('image'),
    controllers.product.editPost
  );

  app.get(
    '/product/delete/:id',
    auth.isAuthenticated,
    controllers.product.deleteGet
  );
  app.post(
    '/product/delete/:id',
    auth.isAuthenticated,
    controllers.product.deletePost
  );

  app.get('/category/add', auth.isInRole('Admin'), controllers.category.addGet);
  app.post(
    '/category/add',
    auth.isInRole('Admin'),
    controllers.category.addPost
  );

  app.get(
    '/category/:category/products',
    controllers.category.productByCategory
  );

  app.get('/product/buy/:id', auth.isAuthenticated, controllers.product.buyGet);
  app.post(
    '/product/buy/:id',
    auth.isAuthenticated,
    controllers.product.buyPost
  );

  app.get('/user/register', controllers.user.registerGet);
  app.post('/user/register', controllers.user.registerPost);

  app.get('/user/login', controllers.user.loginGet);
  app.post('/user/login', controllers.user.loginPost);

  app.post('/user/logout', controllers.user.logout);
};
