var express = require('express');
var router = express.Router();
const pro = require("../sql/pro");
const sql = require("../sql/sql");
const uuid = require("uuid");



// let search = req.query.search || {};
// let num = req.query.num || pro.countDocuments();
// let index = req.query.index || 0;
// let sortKey = req.query.sortKey || {};
// pro.find(search).limit(num).skip(index).sort(sortKey);

// 获取所有：全都不传，都是默认
// 获取指定分页：不传search，sortKey，只传num和index
// 搜索指定名称（模糊搜索）：只传search
// 获取排序数据：只传sortKey
// 获取某一页数据后，排序：
// 搜索之后，排序
// 搜索之后，分页



/**
* @apiGroup 商品信息
* @api {get} /api/pro 获取商品数据
* @apiVersion 0.0.0
* @apiDescription 请求所有商品数据，哈哈
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
    res.send({
        code:201,
        title:"请求失败",
        msg:"NOT DATA"
    })
* @apiSampleRequest http://localhost:3000/api/pro
*/

// 获取所有商品数据的接口
router.get('/', function(req, res, next) {
    sql.getData(pro).then(data=>{
        res.send({
            code:200,
            title:"请求成功",
            msg:data
        })
    }).catch(err=>{
        res.send({
            code:201,
            title:"请求失败",
            msg:"NOT DATA"
        })
    });
});

/**
* @apiGroup 商品信息
* @api {get} /api/pro/detail 获取商品详情数据
* @apiVersion 0.0.0
* @apiDescription 请求指定商品详情数据，嘿嘿
* @apiParam {String} id="" 要获取的商品详情的商品id
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data[0]
    })
    res.send({
        code:201,
        title:"请求失败",
        msg:"NOT DATA"
    })
* @apiSampleRequest http://localhost:3000/api/pro/detail
*/

// 获取商品详情的接口
router.get('/detail', function(req, res, next) {
    sql.getData(pro,{proId:req.query.id}).then(data=>{
        res.send({
            code:200,
            title:"请求成功",
            msg:data[0]
        })
    }).catch(err=>{
        res.send({
            code:201,
            title:"请求失败",
            msg:"NOT DATA"
        })
    });
});


/**
* @apiGroup 商品信息
* @api {get} /api/pro/search 模糊搜索商品名称
* @apiVersion 0.0.0
* @apiDescription 模糊搜索商品名称，嘻嘻
* @apiParam {String} sKey="" 要搜索的关键字
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
    res.send({
        code:201,
        title:"请求成功，但是没有数据",
        msg:"NOT DATA"
    })
    res.send({
        code:202,
        title:"请求失败",
        msg:"NOT DATA"
    })
* @apiSampleRequest http://localhost:3000/api/pro/search
*/

// 模糊搜索名称
router.get('/search', function(req, res, next) {
    let reg = new RegExp(req.query.sKey);
    sql.getData(pro,{proName: reg}).then(data=>{
        if(data.length > 0){
            res.send({
                code:200,
                title:"请求成功",
                msg:data
            })
        }else{
            res.send({
                code:201,
                title:"请求成功，但是没有数据",
                msg:"NOT DATA"
            })
        }
    }).catch(err=>{
        res.send({
            code:202,
            title:"请求失败",
            msg:"NOT DATA"
        })
    });
});


/**
* @apiGroup 商品信息
* @api {get} /api/pro/page 获取指定分页数据
* @apiVersion 0.0.0
* @apiDescription 获取指定分页数据
* @apiParam {Number} num=10 单页要显示的数据条数，默认单页10条
* @apiParam {Number} index=0 查询的页码，默认为0，表示第一页
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/pro/page
*/

// 获取指定分页数据
router.get('/page', function(req, res, next) {
    let num = req.query.num-0;
    let index = req.query.index * 1;
    sql.getPageData(pro, num, index).then(data=>{
        res.send({
            code:200,
            title:"请求成功",
            msg:data
        })
    });
});


/**
* @apiGroup 商品信息
* @api {get} /api/pro/sort 获取根据指定字段排序数据
* @apiVersion 0.0.0
* @apiDescription 获取根据指定字段排序数据
* @apiParam {String} col="price" 要排序的字段
* @apiParam {Number} direct=1 升序或降序，1表示升，-1表示降
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/pro/sort
*/

// 根据指定字段排序
router.get('/sort', function(req, res, next) {

    // 假设，将来会接收到的数据的格式或内容
    // req.query.col = "price"
    // req.query.direct = -1

    var o = {};
    o[req.query.col] = req.query.direct / 1;

    sql.getSortData(pro, o).then(data=>{
        res.send({
            code:200,
            title:"请求成功",
            msg:data
        })
    });
});


/**
* @apiGroup 商品信息
* @api {get} /api/pro/brand 根据商品分类获取品牌信息
* @apiVersion 0.0.0
* @apiDescription 根据商品分类获取品牌信息
* @apiParam {String} kindKey 分类名称
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/pro/brand
*/

router.get('/brand', function(req, res, next) {
    let kindKey = req.query.kindKey

    sql.getData(pro, {kind: kindKey}).then(data=>{

        let msg = [];       // [{brand},{brand}]

        data.forEach(val => {
            msg.push({
                brandId: 'brand-'+uuid.v1(),
                brand: val.brand,
                logo: val.logo
            })
        });

        var newMsg = [];
        msg.forEach(val=>{
            if(!has(newMsg, val.brand)){
                newMsg.push(val)
            }
        })

        res.send({
            code:200,
            title:"获取成功",
            msg:newMsg
        })

        function has(arr, key){
            return arr.some(val=>{
                return val.brand === key
            })
        }

    });
});


/**
* @apiGroup 商品信息
* @api {get} /api/pro/kind 获取商品分类
* @apiVersion 0.0.0
* @apiDescription 获取商品分类
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/pro/kind
*/

// 根据指定字段排序
router.get('/kind', function(req, res, next) {
    sql.getKind(pro, "kind").then(data=>{
        res.send({
            code:200,
            title:"请求成功",
            msg:data
        })
    });
});

module.exports = router;
