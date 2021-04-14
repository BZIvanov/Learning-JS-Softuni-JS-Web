const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add name of the project'],
    unique: true,
  },
  description: [
    {
      type: String,
      required: [true, 'Please add description of the project'],
      maxlength: 50,
    },
  ],
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

module.exports = model('Project', projectSchema);
