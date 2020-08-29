const router = require('express').Router();
const controllers = require('../controllers');

router.get('/register', controllers.user.registerGet);
router.post('/register', controllers.user.registerPost);
router.get('/login', controllers.user.loginGet);
router.post('/login', controllers.user.loginPost);
router.post('/logout', controllers.user.logout);

module.exports = router;
