const router = require('express').Router();
const { index } = require('../handlers/common');

router.get('/', index);

module.exports = router;
