const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = Schema({
  title: Schema.Types.String,
  memes: [{ type: Schema.Types.ObjectId, ref: 'Meme' }],
});

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;
