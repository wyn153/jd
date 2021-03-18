var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.power < 1){
    res.render('shop',{
       index : 5 , 
       power:req.session.power
      })
  }else{
    res.send('您的权限不够')
  }
});

module.exports = router;
