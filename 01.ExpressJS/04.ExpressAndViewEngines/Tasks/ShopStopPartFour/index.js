require('dotenv').config();
const express = require('express');

const app = express();

require('./config/database')();
require('./config/express')(app);
require('./config/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
