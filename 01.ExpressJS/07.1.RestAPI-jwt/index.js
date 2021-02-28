require('dotenv').config();
const express = require('express');
const app = express();

require('./startup/db');
require('./startup/express')(app);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}...`)
);
require('./startup/error-handling')(server);
