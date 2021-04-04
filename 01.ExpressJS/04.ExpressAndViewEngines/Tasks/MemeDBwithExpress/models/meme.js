const { Schema, model } = require('mongoose');

const memeSchema = new Schema({
  title: String,
  memeSrc: String,
  description: String,
  privacy: String,
  dataStamp: Number,
  genreId: String,
});

module.exports = model('Meme', memeSchema);
