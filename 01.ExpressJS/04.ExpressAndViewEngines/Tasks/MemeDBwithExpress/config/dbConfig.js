const mongoose = require('mongoose');
const Admin = mongoose.mongo.Admin;
const memeService = require('../services/meme');
const genreService = require('../services/genre');
const initialData = require('../infrastructure/initialData');

const databaseName = 'memeDb';

module.exports = new Promise((resolve, reject) => {
  mongoose.connect(`mongodb://localhost:27017/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .on('open', () => {
      console.log(
        `Successfully connected to MongoDB, ${databaseName} database`
      );
      new Admin(mongoose.connection.db).listDatabases((err, result) => {
        const database = result.databases
          .map((d) => d.name)
          .filter((n) => n === databaseName)[0];
        if (!database) {
          seed();
        }
        resolve();
      });
    })
    .on('error', (err) => {
      console.log(err);
      reject(err);
    });
});

function seed() {
  console.log('Seeding initial data...');
  genreService
    .create(initialData.genre)
    .then((genre) => {
      memeService.createRange(initialData.memes).then((memes) => {
        memes.forEach((m) => {
          genre.memes.push(m._id);
          m.genreId = genre._id;
          m.save();
        });
        genre.save();
        console.log('Seed complete.');
      });
    })
    .catch((err) => console.log(err));
}
