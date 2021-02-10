const mongoose = require('mongoose');
const Joi = require('joi');

const movieSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

function validateMovie(movie) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  const { error } = schema.validate(movie);
  return error;
}

const Movie = new mongoose.model('Movie', movieSchema);

exports.Movie = Movie;
exports.validateMovie = validateMovie;
