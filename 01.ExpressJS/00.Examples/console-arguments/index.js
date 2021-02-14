/*
below is example of how to get values as console arguments
in the terminal navigate to the folder containing this file and run **node index.js hello**
*node index.js* will normally execute this file and we will provide an extra string as an extra argument.
*/
console.log(process.argv);

/*
the result will be an array with 3 elements:
[
  'Path to the node.js installation folder',
  'Path to this file'
  'hello'
]
*/

const consoleString = process.argv[2];
console.log('The provided string is: ' + consoleString);
