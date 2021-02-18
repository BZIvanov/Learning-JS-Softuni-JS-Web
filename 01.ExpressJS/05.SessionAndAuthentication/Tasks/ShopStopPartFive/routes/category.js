const router = require('express').Router();
const {
  addGet,
  addPost,
  productByCategory,
} = require('../controllers/category');
const auth = require('../config/auth');

router.get('/add', auth.isInRole('Admin'), addGet);
router.post('/add', auth.isInRole('Admin'), addPost);
router.get('/:category/products', productByCategory);

module.exports = router;
