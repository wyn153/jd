var express = require('express');
var router = express.Router();
const order = require("../sql/order");
const cart = require("../sql/cart");
const pro = require("../sql/pro");
// const address = require("../sql/address");
const sql = require("../sql/sql");
const tools = require("../tools")
const uuid = require("uuid")

/**
* @apiGroup 订单信息
* @api {post} /api/order/add 创建订单
* @apiVersion 0.0.0
* @apiDescription 创建订单
* @apiParam {String} userId 要添加订单的用户id
* @apiParam {Array} proData 要添加到订单的所有的商品数据(含id和num)
* @apiParam {String} addressId 收货地址的id(暂无，二期功能)
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/order/add
*/

// 验证商品是否存在：pro
    // 没有，提示
    // 有，可以直接添加订单

router.post('/add', function(req, res, next) {
    let userId = req.body.userId;
    // 因为添加订单时，需要添加多个商品数据，所以接收到的商品id是json数组的形式
    let proData = JSON.parse(req.body.proData);
    // let addressId = req.body.addressId;

    let token = req.headers.token

    tools.verify(token).then(result=>{
        ;(async function(){
            let bigArr = [];
            // 每一个商品id都需要验证是否存在
            // 遍历数组
            for(var i=0;i<proData.length;i++){
                // 验证商品是否存在
                let pd = await sql.getData(pro, {proId: proData[i].proId});
                if(pd.length > 0){
                    bigArr.push({
                        proId: pd[0].proId,
                        img: pd[0].img,
                        proName:pd[0].proName,
                        price:pd[0].price,
                        num:proData[i].num
                    })
                }
            }
            sql.addData(order, {
                orderId: "order-" + uuid.v1(),
                userId,
                proData: bigArr,
                state: 0,
                time:Date.now()
            }).then(()=>{
                sql.getData(cart, {userId}).then(cartData=>{
                    var arr = cartData[0].proData.filter(val=>!val.flag)
                    sql.setData(cart,{userId},{
                        proData:arr
                    }).then(()=>{
                        res.send({
                            code:200,
                            title:"添加订单并删除购物车对应数据成功",
                            msg:"ok"
                        })
                    })
                })
            })
        })();
    }).catch(err=>{
        res.send({
            code:400,
            title:"登录信息失效",
            msg:err
        })
    })
});




/**
* @apiGroup 订单信息
* @api {get} /api/order 获取订单
* @apiVersion 0.0.0
* @apiDescription 获取订单
* @apiParam {String} userId 要添加订单的用户id
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/order/
*/

router.get('/', function(req, res, next) {
    let userId = req.query.userId

    let token = req.headers.token

    tools.verify(token).then(result=>{
        sql.getData(order, {userId}).then(data=>{
            res.send({
                code:200,
                title:"获取成功",
                msg:data
            })
        })
    }).catch(err=>{
        res.send({
            code:400,
            title:"登录失效",
            msg:err
        })
    })
})


/**
* @apiGroup 订单信息
* @api {get} /api/order/pay 去支付
* @apiVersion 0.0.0
* @apiDescription 去支付
* @apiParam {String} userId 要添加订单的用户id
* @apiParam {String} orderId 要添加订单的用户id
* @apiParam {Number} price 订单的总价格(暂无，二期功能)
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"请求成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/order/pay
*/

router.get('/pay', function(req, res, next) {
    let userId = req.query.userId
    let orderId = req.query.orderId

    let token = req.headers.token

    tools.verify(token).then(result=>{
        sql.setData(order, {userId, orderId},{
            state: 1
        }).then(()=>{
            res.send({
                code:200,
                title:"支付成功",
                msg:"ok"
            })
        })
    }).catch(err=>{
        res.send({
            code:400,
            title:"登录失效",
            msg:err
        })
    })
})

module.exports = router;
