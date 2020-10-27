const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Please add name of the project'],
    unique: true,
  },
  description: [
    {
      type: mongoose.Schema.Types.String,
      required: [true, 'Please add description of the project'],
      maxlength: 50,
    },
  ],
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
