var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  // 0:超级，1:普通
  if(req.session.power < 1){
    res.render("order",{
      index:4,
      power:req.session.power
    });
  }else{
    res.send("no power");
  }

});

module.exports = router;
