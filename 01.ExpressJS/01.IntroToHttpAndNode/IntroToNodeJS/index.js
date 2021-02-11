const storage = require('./storage');
const storageCB = require('./storageCB');

storage.put('wow', 'Hi');
storage.put('wait', 'me');
storage.put('nana', 1);
storage.loadWithPromise().then(function () {
  console.log(storage.getAll());
});

storageCB.put('color', 'green', (storage) => console.log(storage));
storageCB.get('color', (storage) => console.log(storage));
storageCB.load((storage) => console.log(storage));
