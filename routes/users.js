let express = require('express');
let router = express.Router();
const {Login,Register} = require('../controller/user')

const {SuccessModel, ErrorModel} = require('../model/resModel')
// 登录账户
router.post('/login', function(req, res, next) {
  const {username,password} = req.body
  // const {username,password} = req.query
  let result = Login(username,password)
  result.then(data=>{
    if(data.username){
      // 登录成功了才会在session里面的 添加username:***。
      req.session.username = data.username
      // 这里session会同步到redis里面，不需要自己操作
      // 服务端存储session,客户端是看不到的，只能看到cookie,
      // 所以登录成功之后，我们只需要把username,realname放进session里面，再验证登录时拿出来检验即可实现登录检验
      res.json(
        new SuccessModel(
          {
            id:data._id,
            username:data.username,
            code:200
          },'登陆成功'
        )
      )
      return
    }
    res.json(
      new ErrorModel('登录失败,请检查用户名与密码是否正确')
    )
  })
})

// 注册账户
router.post('/register',function(req,res ,next){
  const {username,password} = req.body
  // const {username,password} = req.query
  let result = Register(username,password)

  result.then(data=>{
    if(data.message){
      res.json(
        new ErrorModel(data.message)
      )
      return
    }
    if(data.username){
      req.session.username = data.username
      // 这里session会同步到redis里面，不需要自己操作
      // 服务端存储session,客户端是看不到的，只能看到cookie,
      // 所以登录成功之后，我们只需要把username放进session里面，再验证登录时拿出来检验即可实现登录检验
      res.json(
        new SuccessModel({code:200},'注册成功')
      )
      return
    }

    res.json(
      new ErrorModel('注册失败')
    )
  })
  
})


module.exports = router
