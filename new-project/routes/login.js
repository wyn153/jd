var express = require('express');
var router = express.Router();
const admin = require("../sql/admin");
const sql = require("../sql/sql")
const md5 = require("md5");

// 登录页面的渲染
router.get('/', function(req, res, next) {
  res.render("login");
});

// 点击登录提交用户信息之后的操作
router.post('/check', function(req, res, next) {
    // 根据用户输入的信息，进行管理员信息查询
    sql.getData(admin, {userName: req.body.un, passWord:md5(req.body.pw)}).then(data=>{
        // 查到了，登录成功
        if(data.length > 0){
            // 存储登录状态
            // res.cookie("isLogin","ok");
            req.session.isLogin = "ok";
            // 登录成功之后，将管理员权限也存储起来
            // 将来在所有路由渲染中将权限数据发送给页面模板
            // 用来做权限筛选
            req.session.power = data[0].power;
            req.session.userName = data[0].userName;
            // 跳转到首页
            res.redirect("/");
        }else{
            // 清除登录状态
            // res.cookie("isLogin","");
            req.session.isLogin = "";
            // 跳转到登录路由
            res.redirect("/login");
        }
    })

});

module.exports = router;

