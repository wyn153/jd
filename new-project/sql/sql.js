// 封装mongo的各种操作，成工具方法，方便将来项目中使用
// 直接将所有方法放在一个对象中，暴露到模块外部
module.exports = {
    // 添加数据(集合对象, 要插入的数据)
    // 执行完毕后得到一个promise实例，使用promise的实例方法then和catch处理异步的成功或失败
    addData(collectName, data){
        return new Promise((resolve, reject)=>{
            collectName.insertMany(data,(err)=>{
                if(!err){
                    resolve()
                }else{
                    reject(err);
                }
            })
        })
    },
    // 删除数据(集合对象, 删除条件, 单条或多条)
    delData(collectName, where, num=1){     // 默认删除单条
        // 根据用户传入的数量决定将来使用 删除单条 还是 删除多条
        let type = num === 1 ? "deleteOne" : "deleteMany";
        return new Promise((resolve, reject)=>{
            collectName[type](where, (err)=>{
                if(!err){
                    resolve()
                }else{
                    reject(err);
                }
            })
        })
    },
    // 改数据(集合对象, 修改条件, 怎么改, 单或多)
    setData(collectName, where, what, num=1){
        let type = num === 1 ? "updateOne" : "updateMany";
        return new Promise((resolve, reject)=>{
            collectName[type](where, what, (err)=>{
                if(!err){
                    resolve()
                }else{
                    reject(err);
                }
            })
        })
    },
    // 查指定数据(集合对象, 条件)
    getData(collectName, where={}){     // 默认查所有
        return new Promise((resolve, reject)=>{
            collectName.find(where, {_id:0,__v:0}).exec((err, data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data);
                }
            })
        })
    },
    // 查指定数据并排序(集合对象, 排序规则, 条件)
    getSortData(collectName, s, where={}){     // 默认查所有
        return new Promise((resolve, reject)=>{
            collectName.find(where, {_id:0,__v:0}).sort(s).exec((err, data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data);
                }
            })
        })
    },
    // 查指定数据并分页(集合对象, 条件, 单页条目, 索引)
    getPageData(collectName, num, index, where={}){     // 默认查所有
        return new Promise((resolve, reject)=>{
            collectName.find(where, {_id:0,__v:0}).limit(num).skip(num*index).exec((err, data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data);
                }
            })
        })
    },
    // 查询数据的总条数(集合对象)
    getDataLen(collectName){
        return new Promise((resolve, reject)=>{
            collectName.countDocuments().exec((err, data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data);
                }
            })
        })
    },
    // 查询分类(集合对象, 字段名)
    getKind(collectName, col){
        return new Promise((resolve, reject)=>{
            collectName.distinct(col, (err, data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data);
                }
            })
        })
    },
    // .....
}



