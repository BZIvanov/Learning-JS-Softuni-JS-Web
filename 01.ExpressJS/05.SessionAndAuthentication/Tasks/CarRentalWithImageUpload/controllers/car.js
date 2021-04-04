const Car = require('../models/Car');
const Rent = require('../models/Rent');

module.exports = {
  addCarGet: (req, res) => {
    // in the render the string property is how the html/hbs is called and in which directory it is
    res.render('car/add');
  },
  addCarPost: async (req, res) => {
    let reqCar = req.body;
    reqCar.image = req.file.path.replace('public', '');

    await Car.create(reqCar)
      .then(() => {
        res.redirect('/car/all');
      })
      .catch(() => {
        reqCar.error = 'Please fill all fields!';
        res.render('car/add', reqCar);
      });
  },
  allCars: (req, res) => {
    Car.find({ isRented: false }).then((cars) => {
      res.render('car/all', {
        cars: cars,
      });
    });
  },
  rentCarGet: (req, res) => {
    const carId = req.params.id;

    Car.findById(carId).then((foundCar) => {
      res.render('car/rent', {
        model: foundCar.model,
        image: foundCar.image,
        _id: foundCar._id,
      });
    });
  },
  rentCarPost: async (req, res) => {
    const carId = req.params.id;
    const { days } = req.body;

    let rent = await Rent.create({
      days,
      car: carId,
      owner: req.user._id,
    });

    await Car.findByIdAndUpdate(
      { _id: carId },
      { $set: { isRented: true, expiresOn: rent.days } }
    );

    res.redirect('/user/rents');
  },
  editCarGet: (req, res) => {
    const carId = req.params.id;

    Car.findById(carId).then((car) => {
      res.render('car/edit', {
        model: car.model,
        image: car.image,
        pricePerDay: car.pricePerDay,
      });
    });
  },
  editCarPost: async (req, res) => {
    const carId = req.params.id;
    const editedCarBody = req.body;

    await Car.findById(carId).then((car) => {
      car.model = editedCarBody.model;
      car.pricePerDay = editedCarBody.pricePerDay;

      if (req.file) {
        car.image = '\\' + req.file.path + '.jpg';
      }

      car.save().then(() => {
        res.redirect('/car/all');
      });
    });
  },
  searchModel: (req, res) => {
    const queryData = req.query;

    Car.find({ isRented: false }).then((cars) => {
      cars = cars.filter((x) =>
        x.model.toLowerCase().includes(queryData.model.toLowerCase())
      );

      res.render('car/all', {
        cars,
      });
    });
  },
};
