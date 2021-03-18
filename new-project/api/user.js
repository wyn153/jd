var express = require('express');
var router = express.Router();
const tools = require("../tools");
const rn = require("randomnumber");
const user = require('../sql/user')
const sql = require("../sql/sql")
const uuid = require("uuid")
const md5 = require("md5");
const jwt = require("jsonwebtoken");

/**
* @apiGroup 用户信息管理
* @api {get} /api/user/send 发送短信验证码
* @apiVersion 0.0.0
* @apiDescription 根据手机号发送短信验证码
* @apiParam {Number} tel 手机号
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code: 200,
        title: "短信验证码发送成功",
        msg: code  // 测试环境使用，项目环境要改掉
    });
    res.send({
        code: 201,
        title: "短信验证码再次发送成功",
        msg: code  // 测试环境使用，项目环境要改掉
    });
    res.send({
        code: 202,
        title: "手机号已被注册",
        msg: "无"
    });
    res.send({
        code: 203,
        title: err.data.Message,
        msg: "无"
    });
* @apiSampleRequest http://localhost:3000/api/user/send
*/


// 准备好了对应的数据库：user

// 发送短信验证码 - 接收到手机号
    // 先根据手机号去数据库中查询数据
    //     查到了数据
    //         有用户名和密码
    //             手机号已经被注册，不允许发送验证码，提示用户
    //         没有用户名和密码
    //             意味着之前发送过，但是没有注册，重新发送验证码，存到数据库
    //     没有查到数据
    //         直接发送验证码，存到数据库

router.get('/send', function(req, res, next) {
    let tel = Number(req.query.tel);
    let code = rn.generate(6);

    sql.getData(user, {tel}).then(data=>{
        if(data.length > 0){
            if(data[0].userName && data[0].passWord){
                res.send({
                    code: 202,
                    title: "手机号已被注册",
                    msg: "无"
                });
            }else{
                tools.sendMsg(tel, code).then(result=>{
                    sql.setData(user, {tel}, {code}).then(()=>{
                        res.send({
                            code: 201,
                            title: "短信验证码再次发送成功",
                            msg: code  // 测试环境使用，项目环境要改掉
                        });
                    })
                }).catch(err=>{
                    res.send({
                        code: 203,
                        title: err.data.Message,
                        msg: "无"
                    });
                })
            }
        }else{
            tools.sendMsg(tel, code).then(result=>{
                sql.addData(user,{
                    tel:tel, code:code
                }).then(()=>{
                    res.send({
                        code: 200,
                        title: "短信验证码发送成功",
                        msg: code  // 测试环境使用，项目环境要改掉
                    });
                })
            }).catch(err=>{
                res.send({
                    code: 203,
                    title: err.data.Message,
                    msg: "无"
                });
            })
        }
    })
});






/**
* @apiGroup 用户信息管理
* @api {post} /api/user/register 注册
* @apiVersion 0.0.0
* @apiDescription 注册
* @apiParam {String} username 用户名
* @apiParam {String} password 密码
* @apiParam {Number} tel 手机号
* @apiParam {Number} code 验证码
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"注册成功",
        msg:{}
    })
    res.send({
        code:201,
        title:"用户名重复",
        msg:"无"
    })
    res.send({
        code:202,
        title:"请先发送验证码",
        msg:"无"
    })
    res.send({
        code:203,
        title:"一个手机号只能对应一个用户",
        msg:"无"
    })
    res.send({
        code:204,
        title:"验证码错误",
        msg:"无"
    })
* @apiSampleRequest http://localhost:3000/api/user/register
*/



// 注册形式:
// 1. 手机号注册
//     手机号就是用户名
// 2. 用户名注册
//     手机号只是一个信息而已，一个手机号会有多个账号
// 3. 手机号且用户名注册
//     用户名就是用户名，手机号也可以是用户名，但是一个手机号只能对应一个用户名

// 注册形式3的逻辑：
    // 接收用户名，手机号，密码，验证码
    //     1. 根据用户名读取数据
    //         读到了，提醒，用户名重复
    //         没读到，下一步
    //     2. 判断手机号是否存在
    //         不存在，提醒，先发验证码
    //         存在，下一步
    //     3. 根据手机号，判断是否有用户名
    //         有，提醒，一个手机号只能对应一个用户
    //         没有，下一步
    //     4. 判断手机号和验证码是否匹配
    //         不匹配，提醒验证码错误
    //         匹配，下一步
    //     5. 可以注册了，根据手机号，修改用户信息
    //         写入：id，用户名，密码，注册时间，性别，爱好......


router.post('/register', function(req, res, next) {
    // 用户名，手机号，密码，验证码
    let un = req.body.username;
    let tel = Number(req.body.tel);
    let pw = req.body.password;
    let code = Number(req.body.code);
    let v1 = "user-"+uuid.v1();

    sql.getData(user, {userName: un}).then(data1=>{
        if(data1.length > 0){
            res.send({
                code:201,
                title:"用户名重复",
                msg:"无"
            })
        }else{
            sql.getData(user,{tel}).then(data2=>{
                if(data2.length > 0){
                    if(data2[0].userName){
                        res.send({
                            code:203,
                            title:"一个手机号只能对应一个用户",
                            msg:"无"
                        })
                    }else if(data2[0].code !== code){
                        res.send({
                            code:204,
                            title:"验证码错误",
                            msg:"无"
                        })
                    }else{
                        sql.setData(user,{tel},{
                            userId:v1,
                            userName:un,
                            passWord:md5(pw),
                            tel,
                            registerTime:Date.now(),
                            power:0,
                            isLogin:0,
                            nickName:"临时用户",
                            avatar: "http://placehold.it/500X500"
                        }).then(()=>{
                            res.send({
                                code:200,
                                title:"注册成功",
                                msg:{
                                    userId:v1,
                                    userName:un,
                                    passWord:md5(pw),
                                    tel,
                                    registerTime:Date.now(),
                                    power:0,
                                    isLogin:0,
                                    nickName:"临时用户"
                                }
                            })
                        })
                    }
                }else{
                    res.send({
                        code:202,
                        title:"请先发送验证码",
                        msg:"无"
                    })
                }
            })
        }
    })
})





/**
* @apiGroup 用户信息管理
* @api {get} /api/user/login 登录
* @apiVersion 0.0.0
* @apiDescription 登录
* @apiParam {String} username 用户名
* @apiParam {Number} tel 手机号
* @apiParam {String} password 密码
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"登录成功",
        msg:data[0].userId,
        token
    })
    res.send({
        code:201,
        title:"用户名或手机号未注册",
        msg:"无"
    })
    res.send({
        code:202,
        title:"密码不匹配",
        msg:"无"
    })
* @apiSampleRequest http://localhost:3000/api/user/login
*/

// 登录
// 用户名 或 手机号，密码
    // 根据用户名或手机号查询用户数据
    //     没查到，没注册
    //     查到了，下一步
    // 密码是否匹配
    //     不匹配，密码错误
    //     匹配登录成功，更新数据信息
router.get('/login', function(req, res, next) {
    let tel = req.query.tel ? Number(req.query.tel) : '';
    let un = req.query.username;
    let pw = req.query.password;

    sql.getData(user,{$or:[{userName:un},{tel}]}).then(data=>{
        if(data.length < 1){
            res.send({
                code:201,
                title:"用户名或手机号未注册",
                msg:"无"
            })
        }else if(data[0].passWord === md5(pw)){
            sql.setData(user, {$or:[{userName:un},{tel}]}, {
                lastTime:Date.now(),
                isLogin:1
            }).then(()=>{

                // 后台生成一个加密的token
                const token = jwt.sign({
                    userId: data[0].userId
                }, "学IT，请拨打17600901915", {
                    expiresIn: 60 * 60 * 10
                });
                // 将token发给前端，由前端存储
                res.send({
                    code:200,
                    title:"登录成功",
                    msg:data[0].userId,
                    token
                })

            })
        }else{
            res.send({
                code:202,
                title:"密码不匹配",
                msg:"无"
            })
        }
    })
})



/**
* @apiGroup 用户信息管理
* @api {get} /api/user/msg 获取个人信息
* @apiVersion 0.0.0
* @apiDescription 获取个人信息
* @apiParam {String} id 用户id
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:data1,
        msg:data2[0]
    })
    res.send({
        code:201,
        title:"登录信息失效，请重新登录",
        msg:err
    })
* @apiSampleRequest http://localhost:3000/api/user/msg
*/


// 获取个人信息
// 用户id，token
router.get('/msg', function(req, res, next) {
    let id = req.query.id;

    let token = req.headers.token;

    jwt.verify(token, "学IT，请拨打17600901915", (err, data1)=>{
        if(err){
            res.send({
                code:400,
                title:"登录信息失效，请重新登录",
                msg:err
            })
        }else{
            sql.getData(user, {userId: id}).then(data2=>{
                res.send({
                    code:200,
                    title:data1,
                    msg:data2[0]
                })
            })
        }
    })

})




/**
* @apiGroup 用户信息管理
* @api {get} /api/user/exit 退出
* @apiVersion 0.0.0
* @apiDescription 退出
* @apiParam {String} id 用户id
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"退出成功",
        msg:"无"
    })
    res.send({
        code:201,
        title:"登录信息失效，请重新登录",
        msg:err
    })
* @apiSampleRequest http://localhost:3000/api/user/exit
*/


router.get('/exit', function(req, res, next) {
    let id = req.query.id;

    let token = req.headers.token;

    jwt.verify(token, "学IT，请拨打17600901915", (err, data1)=>{
        if(err){

            res.send({
                code:400,
                title:"登录信息失效，请重新登录",
                msg:err
            })

        }else{

            sql.setData(user, {userId: id}, {
                isLogin: 0
            }).then(data2=>{
                res.send({
                    code:200,
                    title:"退出成功",
                    msg:"无"
                })
            })
        }
    })

})




/**
* @apiGroup 用户信息管理
* @api {post} /api/user/avatar 修改用户头像
* @apiVersion 0.0.0
* @apiDescription 修改用户头像
* @apiParam {String} id 用户id
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"获取成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/user/avatar
*/


router.post('/avatar', function(req, res, next) {
    let id = req.body.id;
    let avatar = req.body.avatar;

    let token = req.headers.token;

    console.log(avatar)
    console.log(id)

    tools.verify(token).then(result=>{
        sql.setData(user, {userId: id}, {
            avatar
        }).then(()=>{
            sql.getData(user, {userId: id}).then(data=>{
                res.send({
                    code:200,
                    tite:"设置并获取头像成功",
                    msg:data[0].avatar
                })
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
* @apiGroup 用户信息管理
* @api {post} /api/user/set 修改用户信息
* @apiVersion 0.0.0
* @apiDescription 修改用户信息
* @apiParam {String} id 用户id
* @apiParam {Object-JSON} msg 用户信息
* @apiSuccess {number} code 请求状态
* @apiSuccess {string} title 请求说明
* @apiSuccess {array} msg 请求数据
* @apiSuccessExample {json} Success-Response:
    res.send({
        code:200,
        title:"获取成功",
        msg:data
    })
* @apiSampleRequest http://localhost:3000/api/user/set
*/

router.post('/set', function(req, res, next) {
    let id = req.body.id;
    let msg = JSON.parse(req.body.msg);

    msg.passWord = md5(msg.passWord)

    let token = req.headers.token;

    tools.verify(token).then(result=>{
        sql.setData(user, {userId: id}, msg).then(()=>{
            sql.getData(user, {userId: id}).then(data=>{
                res.send({
                    code:200,
                    tite:"修改并获取信息成功",
                    msg:data
                })
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

