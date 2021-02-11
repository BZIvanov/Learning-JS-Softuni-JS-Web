require('dotenv').config();
const express = require('express');
const app = express();

require('./startup/error-handling')();
require('./startup/db')();
require('./startup/express')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
