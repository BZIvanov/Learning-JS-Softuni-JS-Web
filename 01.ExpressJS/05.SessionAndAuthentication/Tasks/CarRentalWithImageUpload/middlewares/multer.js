const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // here we specify where the file will be saved. The first parameter is for errors
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Math.random() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb max size file
  },
  fileFilter,
});
