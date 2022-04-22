const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017'

const dbName = "ddangDB"

mongoose.set('useFindAndModify',false)

mongoose.connect(`${url}/${dbName}`,{
    // 配置
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection

// 发生错误
db.on('error',err=>{
    console.log(err)
})

// 连接成功
// db.once('open',()=>{
//     console.log('连接成功')
// })

module.exports = mongoose