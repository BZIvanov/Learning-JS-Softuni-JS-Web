const http = require('http');
const port = 5000;
// in handlers folder we have many files, but by default if we have index file in the folder it will be loaded even if we dont specify its name
const handlers = require('./handlers');

// only the code in the createServer body is used on each request, meaning the if we need to read file only once we can read and save content in variable outside createServer so we dont read the file again and again on each request.
http
  .createServer((req, res) => {
    for (const handler of handlers) {
      // if the requested url is matched by one of the handlers we will display it and break from the loop
      if (!handler(req, res)) {
        break;
      }
    }
  })
  .listen(port, () => console.log(`Listening on port ${port}...`));
