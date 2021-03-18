var express = require('express');
var router = express.Router();
const search = require("../sql/search");
const sql = require("../sql/sql");
const tools = require("../tools")
const uuid = require('uuid')
const pro = require("../sql/pro")


/**
* @apiGroup 搜索关键字
* @api {post} /api/search/add 添加搜索关键字
* @apiVersion 0.0.0
* @apiDescription 添加搜索关键字
* @apiParam {String} userId 正在搜索商品的用户id
* @apiParam {String} wd 搜索关键字
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/search/add
*/

router.post('/add', function(req, res, next) {
    let userId = req.body.userId;
    let searchStr = req.body.wd;

    let token = req.headers.token;
    tools.verify(token).then(result=>{
        sql.addData(search, {
            userId: userId,
            searchId: "search-" + uuid.v1(),
            searchKey: searchStr,
            time: Date.now()
        }).then(()=>{
            res.send({
                code:200,
                title:"搜索关键字添加成功",
                msg:"ok"
            })
        })
    }).catch(err=>{
        res.send({
            code:400,
            title:"登录信息失效",
            msg:err
        })
    })
});


/**
* @apiGroup 搜索关键字
* @api {get} /api/search 获取搜索关键字
* @apiVersion 0.0.0
* @apiDescription 获取搜索关键字
* @apiParam {String} userId 正在搜索商品的用户id
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/search
*/

router.get('/', function(req, res, next) {
    let userId = req.query.userId;

    let token = req.headers.token;
    tools.verify(token).then(result=>{
        sql.getData(search, {userId}).then((data)=>{
            // 前端去重
            // 后端去重
            const searchArr = [];
            data.forEach(val=>{
                searchArr.push(val.searchKey)
            })
            res.send({
                code:200,
                title:"获取关键字成功",
                msg:[...new Set(searchArr)].reverse()
            })
        })
    }).catch(err=>{
        res.send({
            code:400,
            title:"登录信息失效",
            msg:err
        })
    })
});




/**
* @apiGroup 搜索关键字
* @api {post} /api/search/del 删除搜索关键字
* @apiVersion 0.0.0
* @apiDescription 删除搜索关键字
* @apiParam {String} userId 正在搜索商品的用户id
* @apiParam {String} wd 搜索关键字
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/search/del
*/

router.post('/del', function(req, res, next) {
    let userId = req.body.userId;
    let searchStr = req.body.wd;

    let token = req.headers.token;

    tools.verify(token).then(result=>{
        sql.delData(search, {
            userId: userId,
            searchKey: searchStr
        }).then(()=>{
            sql.getData(search, {userId}).then((data)=>{
                const searchArr = [];
                data.forEach(val=>{
                    searchArr.push(val.searchKey)
                })
                res.send({
                    code:200,
                    title:"删除并获取关键字成功",
                    msg:[...new Set(searchArr)].reverse()
                })
            })
        })
    }).catch(err=>{
        res.send({
            code:400,
            title:"登录信息失效",
            msg:err
        })
    })
});



/**
* @apiGroup 搜索关键字
* @api {get} /api/search/brand 根据品牌搜索商品
* @apiVersion 0.0.0
* @apiDescription 根据品牌搜索商品
* @apiParam {String} sKey 要搜索的品牌
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/search/brand
*/

router.get('/brand', function(req, res, next) {
    let searchStr = req.query.sKey;
    // let kind = req.query.kind;   // 指定分类下的品牌

    sql.getData(pro, {
        // kind,
        brand: searchStr
    }).then(data=>{
        res.send({
            code:200,
            title:"请求成功",
            msg:data
        })
    })
});


module.exports = router;
