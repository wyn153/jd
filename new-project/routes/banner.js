var express = require('express');
var router = express.Router();
const fs = require("fs");
const banner = require("../sql/banner")
const sql = require("../sql/sql")
const uuid = require("uuid")

/* GET users listing. */
router.get('/', function(req, res, next) {
  // 读取banner文件数据
  sql.getData(banner).then(data=>{
    res.render("banner",{
      index:2,
      power:req.session.power,
      data
    });
  })
});

router.post('/addAction', function(req, res, next) {
  // multer模块将文件信息从body属性拿出来，单独扩展了一个files属性，数组类型，内含素有的文件对象
  // 为了能获取到所有的文件信息，要遍历解析
  req.files.forEach(val=>{
    // multer会自动生成一个随机文件名（不包括扩展名）
    // 手动修改扩展名（fs模块的改名方法）
    // 获取原文件路径+名称
    let oldName = val.path
    // 拼接新文件路径+名称+扩展名
    let newName = val.path + "-" + val.originalname;
    // 改名
    fs.renameSync(oldName, newName);

    // 以上名称只是服务端的磁盘地址，处理成服务器地址后，存到数据库，或返回给前端
    let serverPath = "http://localhost:3000/" + newName.replace("public/","");

    // 文件信息，存到数据库
    sql.addData(banner, {
      bannerId:"banner-" + uuid.v1(),
      name:req.body.imgName,
      title:req.body.imgTitle,
      src:serverPath,
      time:Date.now(),
      author:req.session.userName
    }).then(()=>{
      // 回到banner路由
      res.redirect("/banner")
    })

  })
});

router.get('/del', function(req, res, next) {
  sql.delData(banner,{bannerId:req.query.id}).then(()=>{
    res.redirect("/banner")
  })
});

module.exports = router;
