const router = require('express').Router();
const controllers = require('../controllers');
const auth = require('../config/auth');

router.get('/add', auth.isInRole('Admin'), controllers.category.addGet);
router.post('/add', auth.isInRole('Admin'), controllers.category.addPost);
router.get('/:category/products', controllers.category.productByCategory);

module.exports = router;
