var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    index:0,
    power:req.session.power
  });
});

module.exports = router;
