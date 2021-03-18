const mongoose = require("./db");

// 创建集合对象
const adminSchema = new mongoose.Schema({
    adminId:{type:String},
    userName:{type:String},
    passWord:{type:String},
    registerTime:{type:String},
    lastTime:{type:String},
    ipAddress:{type:String},
    power:{type:Number}
})

module.exports = mongoose.model("admins", adminSchema);
