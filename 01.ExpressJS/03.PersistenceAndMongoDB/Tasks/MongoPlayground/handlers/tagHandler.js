const formidable = require('formidable');
const Tag = require('../models/tagSchema');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });

      Tag.create({ name: fields.tagName, images: [] })
        .then(() => {
          res.writeHead(302, {
            location: '/',
          });
          res.end();
        })
        .catch(() => {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.write('Server Error');
          res.end();
        });
    });
  } else {
    return true;
  }
};
