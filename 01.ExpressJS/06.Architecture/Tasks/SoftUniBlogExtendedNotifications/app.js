const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// this will catch errors like undefined variable for example
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  // here we dont close the server before shutting down node like we did for unhandledRejection, because this error will only happen synchronously anyway
  process.exit(1);
});

const config = require('./config/config');
const app = express();

// this package will prevent hacker queries. For example instead of data, object query is provided like { email: { $gt: "" } }
app.use(mongoSanitize());

// xss module will replace html symbols from incoming requests data, so no js code can be included with it
app.use(xss());

const env = 'development';
require('./config/database')(config[env]);
require('./config/express')(app, config[env]);
require('./config/passport')();
require('./config/routes')(app);

const server = app.listen(3000, () => console.log('Listening on port 3000'));

// this kind of rejection could happen if we fail connecting to the database for example
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  // here we want to close the server before the node process, because we might have some operations running on the server meanwhile
  server.close(() => {
    process.exit(1); // code 1 stands for unhandled rejection which is the usual case
  });
});
