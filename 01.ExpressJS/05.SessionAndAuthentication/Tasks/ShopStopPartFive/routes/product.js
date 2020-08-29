const router = require('express').Router();
const multer = require('multer');
const controllers = require('../controllers');
const auth = require('../config/auth');

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
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb max size file
  },
  fileFilter,
});

router.get('/add', auth.isAuthenticated, controllers.product.addGet);
// the multer upload is a middlware and signle method specify that only 1 file will be provided
router.post(
  '/add',
  auth.isAuthenticated,
  upload.single('image'),
  controllers.product.addPost
);

router.get('/edit/:id', auth.isAuthenticated, controllers.product.editGet);
router.post(
  '/edit/:id',
  auth.isAuthenticated,
  upload.single('image'),
  controllers.product.editPost
);

router.get('/delete/:id', auth.isAuthenticated, controllers.product.deleteGet);
router.post(
  '/delete/:id',
  auth.isAuthenticated,
  controllers.product.deletePost
);

router.get('/buy/:id', auth.isAuthenticated, controllers.product.buyGet);
router.post('/buy/:id', auth.isAuthenticated, controllers.product.buyPost);

module.exports = router;
