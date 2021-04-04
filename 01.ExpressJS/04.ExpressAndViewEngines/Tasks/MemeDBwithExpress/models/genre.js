const { Schema, model } = require('mongoose');

const genreSchema = new Schema({
  title: String,
  memes: [{ type: Schema.Types.ObjectId, ref: 'Meme' }],
});

module.exports = model('Genre', genreSchema);
