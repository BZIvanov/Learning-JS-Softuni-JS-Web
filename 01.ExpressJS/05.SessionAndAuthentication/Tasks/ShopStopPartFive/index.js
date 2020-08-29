const express = require('express');
const config = require('./config/config');
const database = require('./config/database.config');
const environment = process.env.NODE_ENV || 'development';

const app = express();

database(config[environment]);
require('./config/express')(app, config[environment]);
require('./config/passport')();

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
