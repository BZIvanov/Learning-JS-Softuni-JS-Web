const fs = require('fs');
let storage = {};

function put(key, value, cb) {
  if (!(typeof key === 'string')) {
    throw new Error('The key must be a string');
  } else if (storage.hasOwnProperty(key)) {
    throw new Error('The key already exists in storage');
  } else {
    storage[key] = value;
    cb(storage);
  }
}

function get(key, cb) {
  if (!(typeof key === 'string')) {
    throw new Error('The key must be a string');
  } else if (!storage.hasOwnProperty(key)) {
    throw new Error('The key does not exist in storage');
  } else {
    cb(storage[key]);
  }
}

function getAll(cb) {
  if (Object.keys(storage).length === 0) {
    cb('The storage is empty');
  } else {
    cb(storage);
  }
}

function update(key, newValue, cb) {
  if (!(typeof key === 'string')) {
    throw new Error('The key must be a string');
  } else if (!storage.hasOwnProperty(key)) {
    throw new Error('The key does not exist in storage');
  } else {
    storage[key] = newValue;
    cb(storage);
  }
}

function deleteKey(key, cb) {
  if (!(typeof key === 'string')) {
    throw new Error('The key must be a string');
  } else if (!storage.hasOwnProperty(key)) {
    throw new Error('The key does not exist in storage');
  } else {
    delete storage[key];
    cb(storage);
  }
}

function clear(cb) {
  storage = {};
  cb();
}

function save(cb) {
  fs.writeFile('storage.json', JSON.stringify(storage), (err) => {
    if (err) throw err;
    cb(storage);
  });
}

function load(cb) {
  fs.exists('storage.json', (exists) => {
    if (exists) {
      fs.readFile('storage.json', (err, data) => {
        if (err) throw err;
        storage = JSON.parse(data);
        cb(storage);
      });
    } else {
      cb('File does not exist');
    }
  });
}

module.exports = {
  put,
  get,
  getAll,
  update,
  deleteKey,
  clear,
  save,
  load,
};
