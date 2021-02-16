require('dotenv').config();
const express = require('express');

const app = express();

require('./startup/db')();
require('./startup/express')(app);
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`REST API listening on port: ${port}`);
});
