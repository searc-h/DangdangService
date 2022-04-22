// 对应blogs集合
const mongoose  = require('../db')


// 用Schema 定义数据规范
const ItemSchema = mongoose.Schema({
    itemname:{
        type:String,
        required:true,
    },
    itemprice:{
        type:String,
        required:true,
    },
    
},{timestamps:true}) //加上时间戳



// 用Model 对应collection
const Items = mongoose.model('items',ItemSchema)

module.exports = Items
