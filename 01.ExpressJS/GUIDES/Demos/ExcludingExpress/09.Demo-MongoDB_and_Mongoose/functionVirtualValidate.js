const mongoose = require('mongoose');

let chocolateSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.String,
    required: true,
    minlength: 3,
    unique: true,
  },
  ingredient: {
    type: mongoose.Schema.Types.Number,
    required: true,
    min: 5,
    max: 15,
  },
  color: { type: mongoose.Schema.Types.String },
});

// we can attach function to the schema on the methods property. Remember not to use arrow functions so "this" can work properly
chocolateSchema.methods.isDelicious = function () {
  return `It is amazing and I like the color ${this.color}`;
};

// with the virtual property on the schema we can attach virtual properties not existing in the database, they are just to get some end result
// don't use arrow function here because we need to keep 'this'
chocolateSchema.virtual('description').get(function () {
  return `It contains ${this.ingredient} ingredients and color ${this.color}`;
});

// we can validate to data we send to the database by using path and validate properties. The path property is a column from the database
chocolateSchema.path('color').validate(function () {
  return this.color.length >= 2 && this.color.length <= 10;
}, 'Color must be 2 and 10 symbols long!');

let Chocolate = mongoose.model('Chocolate', chocolateSchema);

mongoose.connect('mongodb://localhost:27017/sweets').then(() => {
  let newSweet = new Chocolate({
    brand: 'LoveIt',
    ingredient: 12,
    color: 'purple',
  });
  newSweet.save().catch((err) => console.log(err));

  Chocolate.findOne().then((choco) => console.log(choco.isDelicious()));

  Chocolate.findOne().then((choco) => console.log(choco.description));
});
