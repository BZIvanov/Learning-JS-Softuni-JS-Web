const Handlebars = require('handlebars');
const handlebars = require('express-handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

module.exports = (app) => {
  app.engine(
    '.hbs',
    handlebars({
      defaultLayout: 'layout',
      extname: '.hbs',
      handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
  );
  app.set('view engine', '.hbs');
};
