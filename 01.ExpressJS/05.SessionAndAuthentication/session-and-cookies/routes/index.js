const router = require('express').Router();
const isAuth = require('../middleware/is-auth');
const appController = require('../controllers');

router.get('/', appController.home);
router.get('/login', appController.loginGet);
router.post('/login', appController.loginPost);
router.get('/register', appController.registerGet);
router.post('/register', appController.registerPost);
router.get('/profile', isAuth, appController.profileGet);
router.post('/logout', appController.logoutPost);

module.exports = router;
