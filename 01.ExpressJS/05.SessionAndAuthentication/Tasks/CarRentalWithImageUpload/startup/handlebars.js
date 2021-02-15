const Handlebars = require('handlebars');
const handlebars = require('express-handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

module.exports = function (app) {
  app.engine(
    '.hbs',
    handlebars({
      defaultLayout: 'main',
      extname: '.hbs',
      handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
  );
  app.set('view engine', '.hbs');
};
