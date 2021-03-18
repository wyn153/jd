const mongoose = require("./db");

// 创建集合对象
const bannerSchema = new mongoose.Schema({
    bannerId:{type:String},
    name:{type:String},
    title:{type:String},
    src:{type:String},
    time:{type:String},
    author:{type:String}
})

module.exports = mongoose.model("banners", bannerSchema);
