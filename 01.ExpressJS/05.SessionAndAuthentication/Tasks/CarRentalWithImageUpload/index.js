require('dotenv').config();
const app = require('express')();

require('./startup/db')();
require('./startup/passport')();
require('./startup/handlebars')(app);
require('./startup/express')(app);
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on http://localhost:' + port));
