// const {ErrorModel} = require("../model/resModel")

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