const mongoose = require("mongoose");

// 与连接池建立连接
mongoose.connect('mongodb+srv://wangyanan:123456wang@cluster0.kteu6.mongodb.net/neww?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected",()=>{
    console.log("连接成功")
})

// 连接成功之后，连接池被关闭
mongoose.connection.on("disconnected",()=>{
    console.log("连接断开")
})

// 压根就连不上
mongoose.connection.on("error",()=>{
    console.log("连接错误")
})

module.exports = mongoose;