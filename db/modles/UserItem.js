// 对应blogs集合
const mongoose  = require('../db')


// 用Schema 定义数据规范
const UserItemSchema= mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    itemId:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    isChecked:{
        type:Boolean,
        required:true
    }
},{timestamps:true}) //加上时间戳



// 用Model 对应collection
const userItem= mongoose.model('useritem', UserItemSchema)

module.exports = userItem
