const express = require('express');
const port = 3000;
const config = require('./config/config');
const database = require('./config/database.config');

const app = express();
const environment = process.env.NODE_ENV || 'development';

database(config[environment]);
require('./config/express')(app, config[environment]);
require('./config/routes')(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
