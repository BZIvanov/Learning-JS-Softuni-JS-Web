const EventEmmitter = require('events');

const myEmitter = new EventEmmitter();

myEmitter.on('walk', (arg) => {
  if (arg) {
    console.log(arg);
  } else {
    console.log('Keep walking');
  }
});

myEmitter.emit('walk'); // Keep walking
myEmitter.emit('walk', 'Walk slow'); // Walk slow
