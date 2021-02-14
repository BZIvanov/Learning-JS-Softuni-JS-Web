const { Schema, model } = require('mongoose');
const Joi = require('joi');

const movieSchema = Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Movie = new model('Movie', movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  const { error } = schema.validate(movie);
  return error;
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
