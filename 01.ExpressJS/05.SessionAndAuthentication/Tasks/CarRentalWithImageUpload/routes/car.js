const router = require('express').Router();
const upload = require('../middlewares/multer');
const auth = require('../middlewares/auth');
const {
  allCars,
  addCarGet,
  addCarPost,
  rentCarGet,
  rentCarPost,
  editCarGet,
  editCarPost,
  searchModel,
} = require('../controllers/car');

router.get('/all', allCars);
router.get('/add', auth.hasRole('admin'), addCarGet);
router.post('/add', upload.single('image'), auth.hasRole('admin'), addCarPost);
router.get('/rent/:id', auth.isNotAnonymous, rentCarGet);
router.post('/rent/:id', auth.isNotAnonymous, rentCarPost);
router.get('/edit/:id', auth.hasRole('admin'), editCarGet);
router.post(
  '/edit/:id',
  upload.single('image'),
  auth.hasRole('admin'),
  editCarPost
);
router.get('/search', searchModel);

module.exports = router;
