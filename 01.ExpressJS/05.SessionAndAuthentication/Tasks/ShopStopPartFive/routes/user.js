const router = require('express').Router();
const {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logout,
} = require('../controllers/user');

router.get('/register', registerGet);
router.post('/register', registerPost);
router.get('/login', loginGet);
router.post('/login', loginPost);
router.post('/logout', logout);

module.exports = router;
