// we will load all handlers here to have them in one place
const staticHandler = require('./static');
const homeHandler = require('./home');
const aboutHandler = require('./about');
const errorHandler = require('./error');

module.exports = [staticHandler, homeHandler, aboutHandler, errorHandler];
