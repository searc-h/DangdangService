const User = require('../db/modles/Users')
const {genPassword} = require('../utils/cryp')


const Register = async (username, password)=>{

    // 是否已经存在username
    let result = await User.exists({
        username
    })

    if(result) return {message:'用户名已存在'}
    
    // 生成加密密码
    password = genPassword(password)

    const newuser = await User.create({
        username:username,
        password:password
    })
    return newuser

}
const Login = async (username, password)=>{

    // 生成加密密码
    password = genPassword(password)

    const user = await User.find({
        username,
        password
    })
    if(user[0] == null) return {}
    
    // 注意这里返回的是一个数组，数组里面才是用户对象
    return user[0]

}
module.exports = {
    Login,
    Register
}