const homeHandler = require('./home');
const staticHandler = require('./static');
const movieHandler = require('./movie');
const errorHandler = require('./error');

module.exports = [homeHandler, staticHandler, movieHandler, errorHandler];
