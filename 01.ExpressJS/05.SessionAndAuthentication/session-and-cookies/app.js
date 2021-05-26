require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoSession = require('connect-mongodb-session')(session);
require('./db')();
const routes = require('./routes');

// here we establish connection with mongoDB, where we will store our sessions. We will not keep them in memory
const store = new MongoSession({
  uri: process.env.DB_URI,
  collection: 'sessions',
});

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // here we don't want to always create new session even for the same browser/user
    saveUninitialized: false, // here we don't want to save if we didn't modified the session
    store,
  })
);

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
