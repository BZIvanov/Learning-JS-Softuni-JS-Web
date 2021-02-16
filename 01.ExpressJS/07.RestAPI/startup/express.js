const bodyParser = require('body-parser');
const cors = require('../middleware/cors');
const globalError = require('../middleware/error');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cors);
  app.use(globalError);
};
