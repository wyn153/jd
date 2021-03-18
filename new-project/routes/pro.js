var express = require('express');
var router = express.Router();

const proCollection = require("../sql/pro");
const sql = require("../sql/sql");
const uuid = require("uuid");
const xlsx = require("node-xlsx");

let pageIndex = 0;
let pageNum = 10;

// pro的根路由，默认要立即读取所有数据，渲染pro的页面模板
router.get('/', function(req, res, next) {
  // 获取所有数据
  // sql.getData(proCollection).then((data)=>{
  //   // 将数据传给页面模板
  //   res.render("pro",{
  //     index:1,
  //     data
  //   });
  // })

  // 获取分页数据：第一页
  sql.getPageData(proCollection, pageNum, pageIndex).then((data)=>{

    sql.getDataLen(proCollection).then(len=>{
      // 将数据传给页面模板
      res.render("pro",{
        index:1,
        data,
        pageMaxNum: Math.ceil(len/10),
        pageIndex,
        pageNum,
        power:req.session.power
      });
    })

  })

});

// 添加按钮的跳转到 添加表单 路由
router.get('/add', function(req, res, next) {
  res.render("addForm",{
    index:1,
    power:req.session.power
  });
});

// 添加表单的提交数据路由
router.post('/addAction', function(req, res, next) {
  // 接收到数据
  let data = req.body;
  // 将指定数据，处理成数据库对应的数据类型
  data.price *= 1;
  data.sales *= 1;
  data.stock *= 1;
  data.discount *= 1;
  data.tip *= 1;

  data.proId = "pro-" + uuid.v1();

  // 存入数据库
  sql.addData(proCollection, data).then(()=>{
    // 存入成功之后，路由的重定向
    res.redirect("/pro");
  })
});

// 上传文件处理路由
router.get('/upload', function(req, res, next) {
  let xlsxData = xlsx.parse(__dirname + "/../excel/pro.xlsx")[0].data;
  let arr = [];
  for(let i=1;i<xlsxData.length;i++){
    arr.push({
      proId: "pro-" + uuid.v1(),
      brand: xlsxData[i][3],
      logo: xlsxData[i][4],
      kind: xlsxData[i][2],
      img: xlsxData[i][5],
      proName: xlsxData[i][1],
      price: xlsxData[i][6],
      sales: xlsxData[i][9],
      stock: xlsxData[i][8],
      discount: xlsxData[i][10],
      tip: xlsxData[i][11]
    });
  }

  sql.addData(proCollection, arr).then(()=>{
    res.redirect("/pro");
  })
});

// 删除路由
router.get('/del', function(req, res, next) {
  let proId = req.query.proId
  sql.delData(proCollection, {proId}).then(()=>{
    res.redirect("/pro");
  })
});

// 修改按钮的跳转到 修改表单 路由
router.get('/set', function(req, res, next) {
  let proId = req.query.proId;
  sql.getData(proCollection,{proId}).then(data=>{
    res.render("setForm", {
      index:1,
      data:data[0],
      power:req.session.power
    })
  })
});

// 修改表单的提交数据路由
router.post('/setAction', function(req, res, next) {
  let data = req.body;
  let proId = data.proId;
  data.price *= 1;
  data.sales *= 1;
  data.stock *= 1;
  data.discount *= 1;
  data.tip *= 1;

  sql.setData(proCollection, {proId}, data).then(()=>{
    res.redirect("/pro")
  })
});

// 搜索路由
router.post('/search', function(req, res, next) {
  let reqData = req.body;
  sql.getData(proCollection, {proName: new RegExp(reqData.search)}).then(data=>{
    // 将数据传给页面模板
    res.render("pro",{
      index:1,
      data,
      power:req.session.power
    });
  })
});

// 排序
router.get('/sort', function(req, res, next) {
  let reqData = req.query;
  sql.getSortData(proCollection, reqData).then(data=>{
    // 将数据传给页面模板
    res.render("pro",{
      index:1,
      data,
      power:req.session.power
    });
  })
})

// 分页
router.get('/page', function(req, res, next) {
  let reqData = req.query;
  // res.send(reqData);
  sql.getPageData(proCollection, 10, reqData.index).then((data)=>{
    sql.getDataLen(proCollection).then(len=>{
      // 将数据传给页面模板
      res.render("pro",{
        index:1,
        data,
        pageMaxNum: Math.ceil(len/10),
        pageIndex:reqData.index,
        pageNum,
        power:req.session.power
      });
    })

  })

})



module.exports = router;
