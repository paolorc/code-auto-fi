const router = require('express').Router();

router.use('/api', require('./api'));

// Redirect when not found 
router.use('*', function (req, res) {
  res.status('404').json({
    message: 'No matched Route'
  })
});


module.exports = router;

