const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const shortid = require('shortid');

http
  .createServer((req, res) => {
    if (req.method === 'GET') {
      fs.readFile('./index.html', 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        res.writeHead(200, {
          'Content-Type': 'text/html',
        });
        res.write(data);
        res.end();
      });
    } else if (req.method === 'POST') {
      // here with shortid module we will generate some random name for the new file. This will also help to overwrite files with equal names
      let randomName = shortid.generate();

      let form = new formidable.IncomingForm();

      // we will first check for event error, if there is any we return
      form
        .on('error', (err) => {
          console.log(err);
          return;
        })
        .on('fileBegin', (name, file) => {
          // with fileBegin event we can save the image whereever we want before it start downloading in default folder
          file.path = `./files/${randomName}.jpg`;
        });

      // in the callback we receive error as first parameter, data from input fields and files from input fields
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log(err);
        }

        //console.log(fields);
        // fields is object where the keys are like the names from the form inputs and values are from form input values
        let myName = fields.firstName;
        let myPass = fields.password;
        console.log(myName, myPass);

        res.writeHead(200, {
          'Content-Type': 'text/html',
        });
        res.write('<h1>Thank you</h1>');
        res.end();
      });
    }
  })
  .listen(3000, () => console.log(`Listening on port ${3000}...`));
