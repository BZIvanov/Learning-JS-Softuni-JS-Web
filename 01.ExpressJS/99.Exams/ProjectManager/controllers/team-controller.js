const User = require('../models/User');
const Team = require('../models/Team');

module.exports = {
  createTeamGet: (req, res) => {
    res.render('teams/create');
  },

  createTeamPost: (req, res) => {
    const { name } = req.body;

    Team.create({ name })
      .then((team) => {
        res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
      });
  },

  distributeTeamGet: async (req, res) => {
    try {
      const users = await User.find({});
      const teams = await Team.find({});

      res.render('teams/admin', { users, teams });
    } catch (err) {
      console.log(err);
    }
  },

  distributeTeamPost: async (req, res) => {
    const { userId, teamId } = req.body;
    try {
      const users = await User.find({});
      const teams = await Team.find({});

      const user = await User.findById(userId);
      const team = await Team.findById(teamId);

      if (team.members.indexOf(user.id) > -1) {
        res.locals.globalError = 'User is already in the team';
        res.render('teams/admin', { users, teams });
        return;
      }

      user.teams.push(team);
      team.members.push(user);

      Promise.all([user.save(), team.save()])
        .then(([u, t]) => {
          res.redirect('/');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  },

  listTeamsGet: (req, res) => {
    Team.find({})
      .populate('projects')
      .populate('members')
      .then((teams) => {
        res.render('teams/user', { teams });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  search: (req, res) => {
    const team = req.query.name.toLowerCase();

    Team.find()
      .populate('projects')
      .populate('members')
      .then((teams) => {
        const filteredTeams = teams.filter((a) =>
          a.name.toLowerCase().includes(team)
        );

        res.render('teams/user', {
          result: team,
          teams: filteredTeams,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
