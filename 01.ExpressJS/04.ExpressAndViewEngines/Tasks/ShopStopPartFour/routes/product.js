const router = require('express').Router();
const multer = require('multer');
const {
  addGet,
  addPost,
  editGet,
  editPost,
  deleteGet,
  deletePost,
  buyGet,
  buyPost,
} = require('../handlers/product');

const upload = multer({ dest: './content/images' });

router.get('/add', addGet);
router.post('/add', upload.single('image'), addPost);
router.get('/edit/:id', editGet);
router.post('/edit/:id', upload.single('image'), editPost);
router.get('/delete/:id', deleteGet);
router.post('/delete/:id', deletePost);
router.get('/buy/:id', buyGet);
router.post('/buy/:id', buyPost);

module.exports = router;
