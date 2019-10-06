const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20000000 //up to 20Mb file size
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.match('text/csv')) return cb(new Error('Please upload a csv document only.'));

    cb(undefined, true);
  }
});

const carController = require('../../controllers/carController')

router.post('/upload', upload.single('file'), carController.uploadProcess, (error, req, res, next) => {
  res.status(400).json({
    message: 'Error',
    description: error.message
  })
});

router.route('/')
  .get(carController.getAll);

module.exports = router;
