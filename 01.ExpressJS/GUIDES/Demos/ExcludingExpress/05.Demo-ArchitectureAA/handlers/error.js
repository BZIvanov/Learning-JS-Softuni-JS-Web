function errorHandler(req, res) {
  res.sendHtml('./error.html');
}

module.exports = errorHandler;
