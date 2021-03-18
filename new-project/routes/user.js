var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // 在渲染页面之前，再进行一次权限的验证，放置用户强行通过路由拼接进入对应页面
  // 0:超级，1:普通
  if(req.session.power < 1){
    res.render("user",{
      index:3,
      power:req.session.power
    });
  }else{
    res.send("no power");
  }

});

module.exports = router;
