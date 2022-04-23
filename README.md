### redis实现session存储
```
const session = require('express-session')

const redisClient = require('./db/redis')  //引用redis客户端连接
const RedisStore = require('connect-redis')(session)   
const sessionStore = new RedisStore({
  client: redisClient
})

app.use(session({
  secret: 'WJiol$_123115',
  <!-- 设置cookie -->
  cookie:{
    path:'/',  //默认
    httpOnly:true,   // 默认
    maxAge:24 * 60 * 60 * 1000,
  },
  store: sessionStore  //将session直接放进redis
}))
```

### 登陆检验
```
    与数据库查询成功之后，给session添加username，值为username
    req.session.username = data.username


中间件
{
    const {ErrorModel} = require("../model/resModel")

    function loginCheck(req ,res ,next){
        // 只有真正登录了，session里面才会有 username:***
        if(req.session.username){
            next()
            return
        }

        res.json(
            new ErrorModel('暂未登录哦')
        )
        next()
    }

    module.exports = loginCheck
}


```

### 启动redis服务
```
在redis目录中，打开命令行窗口
redis-server.exe redis.windows.conf
```

### 配置nginx


### 启动项目
```
npm start
默认端口8000
```