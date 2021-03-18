const mongoose = require("./db");

// 创建集合对象
const searchSchema = new mongoose.Schema({
    searchId:{type:String},
    userId:{type:String},
    searchKey:{type:String},
    time:{type:Number}
})

module.exports = mongoose.model("searchs", searchSchema);
