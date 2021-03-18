const mongoose = require("./db");

// 创建集合对象
const proSchema = new mongoose.Schema({
    proId:{type:String},
    brand:{type:String},
    logo:{type:String},
    kind:{type:String},
    img:{type:String},
    proName:{type:String},
    price:{type:Number},
    sales:{type:Number},
    stock:{type:Number},
    discount:{type:Number},
    tip:{type:Number}
})

module.exports = mongoose.model("pros", proSchema);
