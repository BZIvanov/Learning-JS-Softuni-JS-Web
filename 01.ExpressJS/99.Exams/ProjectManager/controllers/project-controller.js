const Team = require('../models/Team');
const Project = require('../models/Project');

module.exports = {
  createProjectGet: (req, res) => {
    res.render('projects/create');
  },

  createProjectPost: (req, res) => {
    const { name, description } = req.body;

    Project.create({ name, description })
      .then((project) => {
        res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
      });
  },

  distributeProjectGet: async (req, res) => {
    try {
      const teams = await Team.find({});
      const projects = await Project.find({});

      projects = projects.filter((p) => {
        if (p.team) {
          return false;
        }
        return true;
      });

      res.render('projects/admin', { teams, projects });
    } catch (err) {
      console.log(err);
    }
  },

  distributeProjectPost: async (req, res) => {
    const { teamId, projectId } = req.body;
    try {
      const currentTeam = await Team.findById(teamId);
      const currentProject = await Project.findById(projectId);

      currentTeam.projects.push(currentProject);
      currentProject.team = currentTeam;

      Promise.all([currentTeam.save(), currentProject.save()])
        .then(([t, p]) => {
          res.redirect('/');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  },

  listProjectsGet: (req, res) => {
    Project.find({})
      .populate('team')
      .then((projects) => {
        projects = projects.map((p) => {
          if (!p.team) {
            p.hasNoTeam = true;
          }
          return p;
        });
        res.render('projects/user', { projects });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  search: (req, res) => {
    const project = req.query.name.toLowerCase();

    Project.find()
      .populate('team')
      .then((projects) => {
        const filteredProjects = projects.filter((a) =>
          a.name.toLowerCase().includes(project)
        );

        res.render('projects/user', {
          result: project,
          projects: filteredProjects,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
