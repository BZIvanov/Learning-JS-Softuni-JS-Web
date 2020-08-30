const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const shortid = require('shortid');
const formidable = require('formidable');
const db = require('../config/dataBase');

function viewAll(req, res) {
  fs.readFile('./views/viewAll.html', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const sortedData = db
      .getDb()
      .sort((a, b) => b.dateStamp - a.dateStamp)
      .filter((meme) => meme.privacy === 'on')
      .map(
        (meme) => `<div class="meme">
          <a href="/getDetails?id=${meme.id}">
          <img class="memePoster" src="${meme.memeSrc}"/>          
        </div>`
      );

    data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', sortedData);

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(data);
  });
}

function viewAddMeme(req, res) {
  fs.readFile('./views/addMeme.html', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(data);
  });
}

function getDetails(req, res) {
  const memeId = qs.parse(url.parse(req.url).query).id;
  const targetedMeme = db.getDb().find((m) => m.id === memeId);

  const memeDetails = `<div class="content">
      <img src="${targetedMeme.memeSrc}" alt=""/>
      <h3>Title  ${targetedMeme.title}</h3>
      <p> ${targetedMeme.description}</p>
      <button><a href="${targetedMeme.memeSrc}" download="${targetedMeme.title}.jpg">Download Meme</a></button>
    </div>`;

  fs.readFile('./views/details.html', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', memeDetails);

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(data);
  });
}

function addMeme(req, res) {
  const dbLength = db.getDb().length;
  const dbPath = `./public/memeStorage/${Math.floor(dbLength / 10)}`;

  const randomFileName = shortid.generate();
  const memePath = dbPath + '/' + randomFileName + '.jpg';

  fs.access(dbPath, (err) => {
    if (err) {
      // if we don't have this path we will create and we will not break from error because now we will have the directory we need
      fs.mkdirSync(dbPath);
    }

    const form = new formidable.IncomingForm();
    form
      .on('error', (err) => {
        console.log(err);
        return;
      })
      .on('fileBegin', (name, file) => {
        // with event fileBegin we can choose where the file will be saved before it is downloaded
        file.path = memePath;
      });

    form.parse(req, (err, fields, files) => {
      const newMeme = {
        id: shortid.generate(),
        title: fields.memeTitle,
        memeSrc: memePath,
        description: fields.memeDescription,
        privacy: fields.status,
        dateStamp: Date.now(),
      };

      db.add(newMeme);
      db.save().then(() => {
        fs.readFile('./views/addMeme.html', 'utf8', (err, data) => {
          if (err) {
            console.log(err);
            return;
          }

          res.writeHead(200, {
            'Content-Type': 'text/html',
          });

          data = data
            .toString()
            .replace(
              '<div id="replaceMe">{{replaceMe}}</div>',
              '<div id="succssesBox"><h2 id="succssesMsg">Meme Added</h2></div>'
            );
          res.write(data);
          res.end();
        });
      });
    });
  });
}

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res);
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res);
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res);
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res);
  } else {
    return true;
  }
};
