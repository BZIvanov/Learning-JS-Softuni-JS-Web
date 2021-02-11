const Car = require('../models/Car');

module.exports.searchModel = (req, res) => {
  let queryData = req.query;

  Car.find({ isRented: false }).then((cars) => {
    cars = cars.filter((x) =>
      x.model.toLowerCase().includes(queryData.model.toLowerCase())
    );

    res.render('car/all', {
      cars,
    });
  });
};
