const mongoose = require("./db");

// 创建集合对象
const cartSchema = new mongoose.Schema({
    cartId:{type:String},
    userId:{type:String},
    proData:{type:Array}
})

module.exports = mongoose.model("carts", cartSchema);
