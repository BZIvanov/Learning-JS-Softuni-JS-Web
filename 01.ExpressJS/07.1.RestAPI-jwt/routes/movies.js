const router = require('express').Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.get('/:id', getMovie);
router.post('/', auth, createMovie);
router.put('/:id', auth, updateMovie);
router.delete('/:id', auth, admin, deleteMovie);

module.exports = router;
