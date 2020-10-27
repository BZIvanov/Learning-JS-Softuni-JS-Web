const User = require('../models/User');
const Team = require('../models/Team');
const Project = require('../models/Project');

module.exports = {
  index: (req, res) => {
    res.render('home/index');
  },

  profileView: (req, res) => {
    const userId = req.params.id;

    User.findById(userId)
      .populate('teams')
      .then((user) => {
        Project.find()
          .populate('team')
          .then(() => {
            res.render('home/profile', user);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  leaveTeam: async (req, res) => {
    const teamId = req.body.teamId;

    try {
      const targetTeam = await Team.findById(teamId);
      targetTeam.members = targetTeam.members.filter((x) => {
        return x.toString() !== req.user.id.toString();
      });

      targetTeam
        .save()
        .then((team) => {
          req.user.teams = req.user.teams.filter((x) => {
            return x.toString() !== team.id.toString();
          });
          req.user
            .save()
            .then(() => {
              res.redirect('/');
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  },
};
