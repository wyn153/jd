const admin = require("./admin")
const sql = require("./sql")
const uuid = require("uuid");
const md5 = require("md5");

sql.addData(admin,{
    adminId:"admin-" + uuid.v1(),
    userName:"liyang",
    passWord:md5("123456"),
    registerTime:Date.now(),
    power:1     // 0:超级，1:一般
}).then(()=>{
    console.log("insert ok")
})
// sql.addData(admin,{
//     adminId:"admin-" + uuid.v1(),
//     userName:"admin",
//     passWord:md5("123456"),
//     registerTime:Date.now(),
//     power:0     // 0:超级，1:一般
// }).then(()=>{
//     console.log("insert ok")
// })