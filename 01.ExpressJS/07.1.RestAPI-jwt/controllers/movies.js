const { Movie, validateMovie } = require('../models/movie');
const asyncMiddleware = require('../middlewares/async');

module.exports.getMovies = asyncMiddleware(async (req, res) => {
  const movies = await Movie.find().sort('name').select('-__v');
  res.send(movies);
});

module.exports.getMovie = asyncMiddleware(async (req, res) => {
  const movie = await Movie.findById(req.params.id).select('-__v');
  if (!movie) {
    return res.status(404).send('Movie not found!');
  }

  res.send(movie);
});

module.exports.createMovie = asyncMiddleware(async (req, res) => {
  const error = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name } = req.body;
  let movie = new Movie({ name });
  movie = await movie.save();

  res.status(201).send(movie);
});

module.exports.updateMovie = asyncMiddleware(async (req, res) => {
  const error = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name } = req.body;
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  ).select('-__v');
  if (!movie) {
    return res.status(404).send('Movie not found!');
  }

  res.send(movie);
});

module.exports.deleteMovie = asyncMiddleware(async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id).select('-__v');
  if (!movie) {
    return res.status(404).send('Movie not found!');
  }

  res.send(movie);
});
