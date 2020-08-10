const fs = require('fs');

let db = {};

function stringCheck(item) {
  if (typeof item !== 'string') {
    throw new Error('The key must be a string!');
  }
}

function existingKey(key) {
  if (!db.hasOwnProperty(key)) {
    throw new Error('The key does not exist!');
  }
}

function put(key, value) {
  stringCheck(key);
  if (db.hasOwnProperty(key)) {
    throw new Error('The key already exists');
  }
  db[key] = value;
}

function get(key) {
  stringCheck(key);
  existingKey(key);
  return db[key];
}

function getAll() {
  let keys = Object.keys(db);
  if (keys.length === 0) {
    return 'The storage is empty!';
  }
  return keys.map((x) => db[x]).join(', ');
}

function update(key, newValue) {
  stringCheck(key);
  existingKey(key);
  db[key] = newValue;
}

function deleteKey(key) {
  stringCheck(key);
  existingKey(key);
  delete db[key];
}

function clear() {
  db = {};
}

function saveSync() {
  let savedData = JSON.stringify(db);
  fs.writeFileSync('./storage.json', savedData);
}

function loadSync() {
  let loadedData = fs.readFileSync('./storage.json', 'utf8');
  return JSON.parse(loadedData);
}

function save(callback) {
  let savedData = JSON.stringify(db);
  fs.writeFile('./storage.json', savedData, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    callback();
  });
}

function load(callback) {
  fs.readFile('./storage.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    db = JSON.parse(data);
    callback();
  });
}

function saveWithPromise() {
  return new Promise((resolve, reject) => {
    let savedData = JSON.stringify(db);
    fs.writeFile('./storage.json', savedData, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function loadWithPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile('./storage.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

module.exports = {
  put,
  get,
  getAll,
  update,
  deleteKey,
  clear,
  saveSync,
  loadSync,
  save,
  load,
  saveWithPromise,
  loadWithPromise,
};
