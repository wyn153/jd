const mongoose = require("./db");

// 订单数据
    // 订单id：
    // 用户id：
    // 商品数据：[{id, name, price, num, img},{...}]
    // 状态：0待付款，1待发货，2待收货，3待评价，4已完成，5售后
    // 订单时间：时间戳
    // 收货地址：地址系统

// 创建集合对象
const orderSchema = new mongoose.Schema({
    orderId:{type:String},
    userId:{type:String},
    proData:{type:Array},
    state:{type:Number},
    time:{type:String},
    address:{type:Array}
})

module.exports = mongoose.model("orders", orderSchema);
