const fs = require('fs');

let db = [];
const dbPath = './db/db.json';

const load = () => {
  return new Promise((res, rej) => {
    fs.readFile(dbPath, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('loading');
      db = JSON.parse(data);
      res();
    });
  });
};

const save = () => {
  return new Promise((res, rej) => {
    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        console.log(err);
        return;
      }
      res();
    });
  });
};

const add = (movie) => {
  db.push(movie);
};

const dbCopy = () => {
  return db.slice(0);
};

module.exports = {
  load,
  save,
  getDb: dbCopy,
  add,
};
