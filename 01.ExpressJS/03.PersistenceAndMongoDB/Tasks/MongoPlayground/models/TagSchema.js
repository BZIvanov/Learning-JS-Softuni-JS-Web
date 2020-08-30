const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  images: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Image' }],
});

// custom functions attached to methods can be used anywhere in our application from the schema object
tagSchema.methods.toLowerCase = function () {
  return (this.name = name.toLowerCase());
};

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
