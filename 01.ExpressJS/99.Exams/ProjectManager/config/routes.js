const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = (app) => {
  // here we dont call functions just provide them
  app.get('/', controllers.home.index);
  app.get(
    '/profile/:id',
    restrictedPages.isAuthed,
    controllers.home.profileView
  );
  app.post('/leaveTeam', restrictedPages.isAuthed, controllers.home.leaveTeam);

  app.get(
    '/register',
    restrictedPages.isAnonymous,
    controllers.user.registerGet
  );
  app.post(
    '/register',
    restrictedPages.isAnonymous,
    controllers.user.registerPost
  );
  app.post('/logout', restrictedPages.isAuthed, controllers.user.logout);
  app.get('/login', restrictedPages.isAnonymous, controllers.user.loginGet);
  app.post('/login', restrictedPages.isAnonymous, controllers.user.loginPost);

  app.get(
    '/createTeam',
    restrictedPages.hasRole('Admin'),
    controllers.team.createTeamGet
  );
  app.post(
    '/createTeam',
    restrictedPages.hasRole('Admin'),
    controllers.team.createTeamPost
  );
  app.get(
    '/distributeTeams',
    restrictedPages.hasRole('Admin'),
    controllers.team.distributeTeamGet
  );
  app.post(
    '/distributeTeams',
    restrictedPages.hasRole('Admin'),
    controllers.team.distributeTeamPost
  );
  app.get(
    '/listTeams',
    restrictedPages.isAuthed,
    controllers.team.listTeamsGet
  );
  app.get('/searchTeam', restrictedPages.isAuthed, controllers.team.search);

  app.get(
    '/createProject',
    restrictedPages.hasRole('Admin'),
    controllers.project.createProjectGet
  );
  app.post(
    '/createProject',
    restrictedPages.hasRole('Admin'),
    controllers.project.createProjectPost
  );
  app.get(
    '/distributeProjects',
    restrictedPages.hasRole('Admin'),
    controllers.project.distributeProjectGet
  );
  app.post(
    '/distributeProjects',
    restrictedPages.hasRole('Admin'),
    controllers.project.distributeProjectPost
  );
  app.get(
    '/listProjects',
    restrictedPages.isAuthed,
    controllers.project.listProjectsGet
  );
  app.get(
    '/searchProject',
    restrictedPages.isAuthed,
    controllers.project.search
  );

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found');
    res.end();
  });
};
