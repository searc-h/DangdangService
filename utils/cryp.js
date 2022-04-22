const crypto =require('crypto')

// 密匙
const SECRET_KEY = 'wJiol_8776#'

// md5 函数
function md5(content) {
    // content 是加密内容
    let md5 = crypto.createHash('md5')

    // 返回16进制的加密结果
    return md5.update(content).digest('hex')
}

// 加密函数s
function genPassword(password){
    const str = `password=${password}&key=${SECRET_KEY}`

    return md5(str)
}


module.exports = {
    genPassword
}