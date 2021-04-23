const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
  name: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
});

// custom functions attached to methods can be used anywhere in our application from the schema object
tagSchema.methods.toLowerCase = function () {
  return (this.name = name.toLowerCase());
};

module.exports = mongoose.model('Tag', tagSchema);
