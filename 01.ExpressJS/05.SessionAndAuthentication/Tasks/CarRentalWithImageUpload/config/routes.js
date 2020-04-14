const restrictedPages = require('./auth');
const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const carController = require('../controllers/car');
const searchController = require('../controllers/search');
const multer = require('multer');

let upload = multer({ dest: './static/images' });

module.exports = (app) => {
  app.get('/', homeController.index);

  app.get('/user/register', userController.registerGet);
  app.post('/user/register', userController.registerPost);

  app.get('/user/login', userController.loginGet);
  app.post('/user/login', userController.loginPost);

  app.get(
    '/car/add',
    restrictedPages.hasRole('Admin'),
    carController.addCarGet
  );
  app.post(
    '/car/add',
    upload.single('image'),
    restrictedPages.hasRole('Admin'),
    carController.addCarPost
  );

  app.get('/car/all', carController.allCars);

  app.get('/search', searchController.searchModel);

  app.get('/car/rent/:id', restrictedPages.isAuthed, carController.rentCarGet);
  app.post(
    '/car/rent/:id',
    restrictedPages.isAuthed,
    carController.rentCarPost
  );

  app.get('/user/rents', restrictedPages.isAuthed, userController.userRents);

  app.get(
    '/car/edit/:id',
    restrictedPages.hasRole('Admin'),
    carController.editCarGet
  );
  app.post(
    '/car/edit/:id',
    upload.single('image'),
    restrictedPages.hasRole('Admin'),
    carController.editCarPost
  );

  app.post('/user/logout', userController.logout);

  // app.all will includes all possible requests(GET, POST, ...) and here is important handling '*' to be the last router in this file, because we will always hit this router if none of above matches.
  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found');
    res.end();
  });
};
