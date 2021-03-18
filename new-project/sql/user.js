const mongoose = require("./db");

// 创建集合对象
const userSchema = new mongoose.Schema({
    userId:{type:String},   // 用户id
    userName:{type:String}, // 用户名
    passWord:{type:String}, // 密码
    tel:{type:Number},      // 手机号
    registerTime:{type:String},// 注册时间
    lastTime:{type:String}, // 最后登录时间
    ipAddress:{type:String},// ip地址
    power:{type:Number},    // vip系统
    isLogin:{type:Number},  // 0未登录，1登录
    nickName:{type:String}, // 昵称
    email:{type:String},    // 邮箱
    avatar:{type:String},   // 头像
    birthday:{type:String}, // 生日 - 时间戳
    sex:{type:Number},      // 1男，0女 
    hobby:{type:Array},     // 兴趣爱好
    code:{type:Number}      // 短信验证码
})

module.exports = mongoose.model("users", userSchema);
