var express = require('express');
var router = express.Router();
const cart = require('../sql/cart')
const sql = require('../sql/sql')
const uuid = require("uuid")
const tools = require("../tools/index.js");
const pro = require("../sql/pro");


/**
* @apiGroup 购物车信息
* @api {post} /api/cart/add 添加购物车数据
* @apiVersion 0.0.0
* @apiDescription 添加购物车数据
* @apiParam {String} userId 要添加购物车数据的用户id
* @apiParam {String} proId 要添加到购物车的商品id
* @apiParam {Number} num 数量
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"首次添加购物车成功",
        msg:"ok"
    })
    res.send({
        code:201,
        title:"更新购物车成功",
        msg:"ok"
    })
    res.send({
        code:202,
        title:"商品不存在",
        msg:"no"
    })
* @apiSampleRequest http://localhost:3000/api/cart/add
*/


// 添加购物车数据的接口逻辑
// 1. 存什么数据, 提前创建集合对象
    // 购物车id：字符
    // 用户id：字符
    // 商品数据：数组
    //     [{proId,proName,price,img,num,flag},{...},{..}]
// 2. 接收数据↑
// 3. 验证登录状态
// 4. 读取商品数据，查看是否存在该商品
// 5. 是不是第一次加入购物车
    // 是，直接存，添加集合数据
    // 不是，判断是不是新商品
    //     是，添加商品数据，更新集合
    //     不是，修改数量，更新集合

router.post('/add', function(req, res, next) {
    let userId = req.body.userId;
    let proId = req.body.proId;
    let num = req.body.num;
    
    let token = req.headers.token;
    
    tools.verify(token).then(result=>{
        sql.getData(pro, {proId}).then(pd=>{
            if(pd.length > 0){
                sql.getData(cart, {userId}).then(data=>{
                    if(data.length < 1){
                        sql.addData(cart, {
                            cartId: uuid.v1(),
                            userId: userId,
                            proData: [{
                                proId:proId,
                                num:num,
                                img:pd[0].img,
                                proName:pd[0].proName,
                                price:pd[0].price,
                                flag:1
                            }]
                        }).then(()=>{
                            res.send({
                                code:200,
                                title:"首次添加购物车成功",
                                msg:"ok"
                            })
                        })
                    }else{
                        let arr = data[0].proData
                        let i = 0;
                        let onoff = arr.some((val,idx)=>{
                            i = idx
                            return val.proId === proId
                        })
                        if(onoff){
                            arr[i].num += Number(num)
                        }else{
                            arr.push({
                                proId:proId,
                                num:num,
                                img:pd[0].img,
                                proName:pd[0].proName,
                                price:pd[0].price,
                                flag:1
                            })
                        }
                        sql.setData(cart, {userId}, {
                            proData: arr
                        }).then(()=>{
                            res.send({
                                code:201,
                                title:"更新购物车成功",
                                msg:"ok"
                            })
                        })
                    }
                })
            }else{
                res.send({
                    code:202,
                    title:"商品不存在",
                    msg:"no"
                })
            }
        })
    }).catch(err=>{
        res.send({
            code:400,
            title:"登录信息失效，请重新登录",
            msg:err
        })
    })

});


/**
* @apiGroup 购物车信息
* @api {get} /api/cart 获取购物车数据
* @apiVersion 0.0.0
* @apiDescription 获取购物车数据
* @apiParam {String} userId 要添加购物车数据的用户id
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"首次添加购物车成功",
        msg:data
    })
    res.send({
        code:400,
        title:"登录信息失效",
        msg:err
    })
* @apiSampleRequest http://localhost:3000/api/cart
*/

router.get('/', function(req, res, next) {
    let userId = req.query.userId;
    let token = req.headers.token;

    tools.verify(token).then(result=>{
        sql.getData(cart, {userId}).then(data=>{
            let d = data[0] ? data[0] : {};
            res.send({
                code:200,
                title:"获取成功",
                msg:d
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
* @apiGroup 购物车信息
* @api {post} /api/cart/flag 修改购物车数据的选中状态
* @apiVersion 0.0.0
* @apiDescription 修改购物车数据的选中状态
* @apiParam {String} userId 要修改购物车数据的用户id
* @apiParam {String} proId 要修改购物车的商品数据的id
* @apiParam {Number} flag 要修改的状态
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"修改成功",
        msg:data
    })
    res.send({
        code:400,
        title:"登录信息失效",
        msg:err
    })
* @apiSampleRequest http://localhost:3000/api/cart/flag
*/

// 修改单个商品状态
router.post('/flag', function(req, res, next) {
    let userId = req.body.userId;
    let proId = req.body.proId;
    let flag = Number(req.body.flag);

    console.log(userId, proId, flag)

    let token = req.headers.token;

    tools.verify(token).then(result=>{
        sql.getData(cart, {userId}).then(data=>{
            if(data.length > 0){
                let arr = data[0].proData
                let i = 0;
                let onoff = arr.some((val,idx)=>{
                    i = idx
                    return val.proId === proId
                })
                if(onoff){
                    arr[i].flag = flag
                }
                sql.setData(cart, {userId}, {
                    proData: arr
                }).then(()=>{
                    res.send({
                        code:200,
                        title:"修改选中状态成功",
                        msg:"ok"
                    })
                })
            }else{
                res.send({
                    code:201,
                    title:"没有购物车数据",
                    msg:"no"
                })
            }
        })
    }).catch(err=>{
        res.send({
            code:400,
            title:"登录失效",
            msg:err
        })
    })
})

// 同步修改所有商品状态
router.post('/allFlag', function(req, res, next) {
    let userId = req.body.userId;
    let flag = Number(req.body.flag);

    let token = req.headers.token;

    tools.verify(token).then(result=>{
        sql.getData(cart, {userId}).then(data=>{
            if(data.length > 0){
                let arr = data[0].proData
                arr.forEach(val=>{
                    val.flag = flag
                })
                sql.setData(cart, {userId}, {
                    proData: arr
                }).then(()=>{
                    res.send({
                        code:200,
                        title:"修改所有商品选中状态成功",
                        msg:"ok"
                    })
                })
            }else{
                res.send({
                    code:201,
                    title:"没有购物车数据",
                    msg:"no"
                })
            }
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
* @apiGroup 购物车信息
* @api {post} /api/cart/num 修改购物车数据的数量
* @apiVersion 0.0.0
* @apiDescription 修改购物车数据的数量
* @apiParam {String} userId 要修改购物车数据的用户id
* @apiParam {String} proId 要修改购物车的商品数据的id
* @apiParam {Number} num 要修改的商品的数量
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"修改成功",
        msg:data
    })
    res.send({
        code:400,
        title:"登录信息失效",
        msg:err
    })
* @apiSampleRequest http://localhost:3000/api/cart/num
*/

router.post('/num', function(req, res, next) {
    let userId = req.body.userId;
    let proId = req.body.proId;
    let num = Number(req.body.num);

    let token = req.headers.token;

    tools.verify(token).then(result=>{
        sql.getData(cart, {userId}).then(data=>{
            if(data.length > 0){
                let arr = data[0].proData
                let i = 0;
                let onoff = arr.some((val,idx)=>{
                    i = idx
                    return val.proId === proId
                })
                if(onoff){
                    arr[i].num = num
                }
                sql.setData(cart, {userId}, {
                    proData: arr
                }).then(()=>{
                    res.send({
                        code:200,
                        title:"修改数量成功",
                        msg:"ok"
                    })
                })
            }else{
                res.send({
                    code:201,
                    title:"没有购物车数据",
                    msg:"no"
                })
            }
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
* @apiGroup 购物车信息
* @api {post} /api/cart/del 删除购物车内的商品数据
* @apiVersion 0.0.0
* @apiDescription 删除购物车内的商品数据
* @apiParam {String} userId 要修改购物车数据的用户id
* @apiParam {String} proId 要修改购物车的商品数据的id
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"删除成功",
        msg:data
    })
    res.send({
        code:400,
        title:"登录信息失效",
        msg:err
    })
* @apiSampleRequest http://localhost:3000/api/cart/del
*/

router.post('/del', function(req, res, next) {
    let userId = req.body.userId;
    let proId = req.body.proId;

    let token = req.headers.token;

    tools.verify(token).then(result=>{
        sql.getData(cart, {userId}).then(data=>{
            if(data.length > 0){
                let arr = data[0].proData
                let i = 0;
                let onoff = arr.some((val,idx)=>{
                    i = idx
                    return val.proId === proId
                })
                if(onoff){
                    arr.splice(i, 1)
                }
                sql.setData(cart, {userId}, {
                    proData: arr
                }).then(()=>{
                    sql.getData(cart, {userId}).then(cartData=>{
                        res.send({
                            code:200,
                            title:"删除成功",
                            msg:cartData[0]
                        })
                    })
                })
            }else{
                res.send({
                    code:201,
                    title:"没有购物车数据",
                    msg:"no"
                })
            }
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
