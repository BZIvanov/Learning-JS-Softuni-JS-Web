const router = require('express').Router();
const { Movie, validateMovie } = require('../models/movie');
const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send('Movie not found!');
  }

  res.send(movie);
});

router.post('/', auth, async (req, res) => {
  const error = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let movie = new Movie({ name: req.body.name });
  movie = await movie.save();

  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const error = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!movie) {
    return res.status(404).send('Movie not found!');
  }

  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) {
    return res.status(404).send('Movie not found!');
  }

  res.send(movie);
});

module.exports = router;
