var express = require('express');
const checkUserRole = require('../middlewares');
var router = express.Router();

router.get('/profile', function (req, res) {
  res.render('profile.njk', { title: 'ACMS | Profile' });
});

router.post('/profile', function (req, res) {
    console.log(req.body);
    res.json(req.body)
  });



module.exports = router;
