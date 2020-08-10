const storage = require('./storage');

storage.put('wow', 'Hi');
storage.put('wait', 'me');
storage.put('nana', 1);

storage.loadWithPromise().then(function () {
  console.log(storage.getAll());
});
