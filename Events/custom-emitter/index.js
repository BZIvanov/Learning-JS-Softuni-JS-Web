const MyEmitter = require('./emitter');

const emitter = new MyEmitter();

emitter.on('greet', function () {
  console.log('Hello first time!');
});

emitter.on('greet', function () {
  console.log('Hello second time!');
});

emitter.emit('greet');
