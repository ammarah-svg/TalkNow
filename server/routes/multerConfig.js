// multerConfig.js
const multer = require('multer');

// Configure multer to specify the destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname); // Define the file name
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
