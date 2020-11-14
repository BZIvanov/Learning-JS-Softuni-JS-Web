const EventEmmitter = require('events');

const myEmitter = new EventEmmitter();

myEmitter.on('walk', (word) => {
  if (word) {
    console.log(word);
  } else {
    console.log('Keep walking');
  }
});

myEmitter.emit('walk');
myEmitter.emit('walk', 'extra');
