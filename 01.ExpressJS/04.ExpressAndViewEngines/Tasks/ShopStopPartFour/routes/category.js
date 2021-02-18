const router = require('express').Router();
const { addGet, addPost, productByCategory } = require('../handlers/category');

router.get('/add', addGet);
router.post('/add', addPost);
router.get('/:category/products', productByCategory);

module.exports = router;
