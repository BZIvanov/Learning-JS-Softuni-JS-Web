const http = require('http');
const port = 3000;
// in handlers folder we have many files, but by default if we have index file in the folder it will be loaded even if we dont specify its name
const handlers = require('./handlers');

let environment = process.env.NODE_ENV || 'development';
const config = require('./config/config');
const database = require('./config/database.config');

database(config[environment]);

const server = http.createServer((req, res) => {
    for(let handler of handlers) {
        // if the requested url is matched by one of the handlers we will display it and break from the loop
        if(!handler(req, res)) {
            break;
        }
    }
})

// second parameter if provided is for the host
server.listen(port, '127.0.0.1', () => console.log(`Listening on port ${port}...`));
