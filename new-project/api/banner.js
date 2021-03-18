var express = require('express');
var router = express.Router();
const banner = require("../sql/banner");
const sql = require("../sql/sql");


/**
* @apiGroup 轮播图信息
* @api {get} /api/banner 获取所有轮播图
* @apiVersion 0.0.0
* @apiDescription 获取所有轮播图
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/banner
*/

router.get('/', function(req, res, next) {
    sql.getData(banner).then(data=>{
        res.send({
            code:200,
            title:"请求成功",
            msg:data
        })
    });
});

module.exports = router;
