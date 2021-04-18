const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const shortid = require('shortid');
const path = require('path');
const router = require('express').Router();
const memeService = require('../services/meme');
const genreService = require('../services/genre');
const memeTemplates = require('../infrastructure/memeTemplates');
const uiTemplates = require('../infrastructure/uiTemplates');

const placeholder = '<div id="replaceMe">{{replaceMe}}</div>';

const memeGenerator = (title, memeSrc, description, privacy, genreId) => {
  return {
    title,
    memeSrc,
    description,
    privacy,
    dateStamp: Date.now(),
    genreId,
  };
};

const defaultResponse = (respString, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.end(respString);
};

const fieldChecker = (obj) => {
  for (const prop in obj) {
    if (obj[prop] === '') {
      return true;
    }
  }
};

const viewAll = (req, res) => {
  memeService.getAll().then((data) => {
    data = data
      .sort((a, b) => b.dateStamp - a.dateStamp)
      .filter((meme) => meme.privacy === 'on');

    let responseString = '';
    for (const meme of data) {
      responseString += memeTemplates.viewAll(meme._id, meme.memeSrc);
    }

    fs.readFile('./views/viewAll.html', (err, html) => {
      if (err) {
        console.log(err);
        return;
      }
      html = html.toString().replace(placeholder, responseString);

      defaultResponse(html, res);
    });
  });
};

const viewAddMeme = (req, res, status = null) => {
  fs.readFile('./views/addMeme.html', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    genreService.getAll().then((genres) => {
      let exitString = '';
      console.log(genres);

      for (const genre of genres) {
        exitString += memeTemplates.genreOption(genre.id, genre.title);
      }

      if (status === 'err') {
        data = data.toString().replace(placeholder, uiTemplates.errorMessage());
      }
      if (status === 'suc') {
        data = data
          .toString()
          .replace(placeholder, uiTemplates.successMessage());
      }
      defaultResponse(
        data
          .toString()
          .replace('<div id="replaceMe2">{{replaceMe2}}</div>', exitString),
        res
      );
    });
  });
};

const getDetails = (req, res) => {
  const targetId = qs.parse(url.parse(req.url).query).id;

  memeService
    .get(targetId)
    .then((targetedMeme) => {
      let replaceString = memeTemplates.details(
        targetedMeme.memeSrc,
        targetedMeme.title,
        targetedMeme.description,
        targetId
      );

      fs.readFile('./views/details.html', (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        data = data.toString().replace(placeholder, replaceString);
        defaultResponse(data, res);
      });
    })
    .catch(() => {
      res.end('Meme does not exist in database!');
    });
};

const addMeme = (req, res) => {
  const fileName = shortid.generate() + '.jpg';
  const fields = req.body;
  const files = req.files;

  memeService.getAll().then((allMemes) => {
    const dirName = `/public/memeStorage/${Math.ceil(allMemes.length / 10)}`;
    const relativeFilePath = dirName + '/' + fileName;
    const absoluteDirPath = path.join(__dirname, `../${dirName}`);
    const absoluteFilePath = absoluteDirPath + '/' + fileName;

    fs.access(absoluteDirPath, (err) => {
      if (err) {
        fs.mkdirSync(absoluteDirPath);
      }

      files.meme.mv(absoluteFilePath, (err) => {
        if (err) {
          console.log(err);
          viewAddMeme(req, res, 'err');
          return;
        }

        if (fieldChecker(fields)) {
          viewAddMeme(req, res, 'err');
        } else {
          const memeForImport = memeGenerator(
            fields.memeTitle,
            relativeFilePath,
            fields.memeDescription,
            fields.status,
            fields.genreSelect
          );

          memeService
            .create(memeForImport)
            .then(() => {
              viewAddMeme(req, res, 'suc');
            })
            .catch(() => {
              viewAddMeme(req, res, 'err');
            });
        }
      });
    });
  });
};

const getSearchMeme = (req, res) => {
  genreService.getAll().then((genres) => {
    fs.readFile('./views/searchMeme.html', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      let exitString = '<option value="all">all</option>';

      for (let genre of genres) {
        exitString += `<option value="${genre.title}">${genre.title}</option>`;
      }

      data = data.toString().replace(placeholder, exitString);
      defaultResponse(data, res);
    });
  });
};

const searchForMeme = (req, res) => {
  const params = req.query;
  const title = params.memeTitle;
  const selectedGenre = params.genreSelect;

  let sorted = [];

  genreService.getAll().then((tags) => {
    memeService.getAll().then((memes) => {
      if (selectedGenre !== 'all') {
        const demo = tags.find((x) => {
          return x.id == selectedGenre;
        });
        const arrSelection = demo.memeArr;

        for (let meme of memes) {
          if (arrSelection.indexOf(meme.id) !== -1) {
            sorted.push(meme);
          }
        }
      } else {
        sorted = memes;
      }

      if (title !== '') {
        sorted = sorted.filter((elem) => {
          if (elem.title.indexOf(title) !== -1) {
            return elem;
          }
        });
      }
      sorted = sorted
        .sort((a, b) => {
          return b.dateStamp - a.dateStamp;
        })
        .filter((meme) => {
          return meme.privacy === 'on';
        });

      let responseString = '';
      for (let meme of sorted) {
        responseString += `<div class="meme">
					<a href="/memes/getDetails?id=${meme.id}">
					<img class="memePoster" src="${meme.memeSrc}"/>          
					</div>`;
      }

      fs.readFile('./views/viewAll.html', (err, html) => {
        if (err) {
          console.log(err);
          return;
        }
        html = html.toString().replace(placeholder, responseString);

        defaultResponse(html, res);
      });
    });
  });
};

const createGenreView = (req, res) => {
  fs.readFile('./views/addGenre.html', (err, data) => {
    if (err) {
      console.log(err);
    }
    defaultResponse(data, res);
  });
};

router
  .get('/viewAllMemes', (req, res) => viewAll(req, res))
  .get('/addMeme', (req, res) => viewAddMeme(req, res))
  .post('/addMeme', (req, res) => addMeme(req, res))
  .get('/getDetails', (req, res) => getDetails(req, res))
  .get('/searchMeme', (req, res) => getSearchMeme(req, res))
  .get('/sSearchMeme', (req, res) => searchForMeme(req, res))
  .get('/addGenre', (req, res) => createGenreView(req, res));

module.exports = router;
