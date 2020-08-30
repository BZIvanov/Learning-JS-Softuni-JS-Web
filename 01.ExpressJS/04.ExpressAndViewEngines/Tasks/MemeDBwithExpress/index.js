const express = require('express');
const bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');

const homeRoutes = require('./routes/home');
const memeRoutes = require('./routes/meme');
const apiRoutes = require('./routes/api');

const app = express();

app.use('/public', express.static('./public'));
app.use(fileUploader());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/memes', memeRoutes);
app.use('/api', apiRoutes);

const PORT = 3000;

require('./config/dbConfig')
  .then(() => {
    app.listen(PORT, () => console.log('Server listening on ' + PORT));
  })
  .catch(() => {
    console.log('Failed to load DB');
  });
