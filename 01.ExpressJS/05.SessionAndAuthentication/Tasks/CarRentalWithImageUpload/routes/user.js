const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  userRents,
  logout,
} = require('../controllers/user');

router.get('/register', registerGet);
router.post('/register', registerPost);
router.get('/login', loginGet);
router.post('/login', loginPost);
router.post('/logout', logout);
router.get('/rents', auth.isNotAnonymous, userRents);

module.exports = router;
