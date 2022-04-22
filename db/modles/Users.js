// 对应users集合
const mongoose  = require('../db')


// 用Schema 定义数据规范
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})



// 用model 对应collection
const Users = mongoose.model('users',UserSchema)

module.exports = Users
