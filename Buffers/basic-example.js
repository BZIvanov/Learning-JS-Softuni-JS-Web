const myBuffer = new Buffer.from('Wood', 'utf8');

console.log(myBuffer); // <Buffer 57 6f 6f 64>
console.log(myBuffer.toJSON()); // { type: 'Buffer', data: [ 87, 111, 111, 100 ] }
console.log(myBuffer[0]); // 87

myBuffer.write('G');
console.log(myBuffer.toString()); // Good
