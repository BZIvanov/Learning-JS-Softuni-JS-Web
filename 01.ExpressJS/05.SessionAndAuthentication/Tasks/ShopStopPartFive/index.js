require('dotenv').config();
const express = require('express');

const app = express();

require('./startup/database')();
require('./startup/handlebars')(app);
require('./config/express')(app);
require('./startup/passport')();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
