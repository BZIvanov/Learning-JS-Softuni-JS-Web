const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
require('./config/database')(config);
const app = require('express')();
require('./config/express')(app);
require('./config/routes')(app);
require('./config/passport')();
app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}...`)
);

/* 
For debugging in the terminal write "npm run debug"
In the browser open "chrome://inspect"

To kill terminal process use "ctrl+c" and agree with "Y"
*/
