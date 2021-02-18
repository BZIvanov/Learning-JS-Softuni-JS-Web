const router = require('express').Router();
const { index } = require('../controllers/common');

router.get('/', index);

module.exports = router;
