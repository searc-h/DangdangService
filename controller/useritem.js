const userItem = require('../db/modles/UserItem')
const Items = require('../db/modles/Items')
// 添加到购物车逻辑
const addItemToCart = async (userid , itemid)=>{
    
    let result = await userItem.find({
        userId:userid,
        itemId:itemid
    })
    // 如果 已经在购物车中，count++
    if(result.length!=0){
        // 数量加1
        result = await userItem.updateOne(
            {userId:userid, itemId:itemid},
            {count:result[0].count+1}
        )
        return result
    }

    result = await userItem.create({
        userId:userid,
        itemId:itemid,
        count:1,
        isChecked:true
    })
    return result 
}
// 修改数目逻辑
const changeTheCount = async(userid,itemid,dtcount)=>{
    let result = await userItem.find({
        userId:userid,
        itemId:itemid
    })

    let oldcount = result[0].count

    // 这里对数字的修改只能是加一减一？
    result = await userItem.findOneAndUpdate(
        {userId:userid,itemId:itemid},
        {count:oldcount + dtcount},
    )
    return result
}

// 修改是否勾选的状态
const changeIsChecked = async(userid,itemid,isChecked)=>{
    
    let result = await userItem.findOneAndUpdate(
        {userId:userid,itemId:itemid},
        {isChecked:isChecked}
    )
    return result
}
// 修改是否全选或者全部选状态
const changeAllChecked= async(userid,isChecked)=>{
    
    let result = await userItem.updateMany(
        {userId:userid},
        {isChecked:isChecked}
    )
    return result
}
// 从购物车删除一条逻辑
const removeItemFromCart = async (userId,itemId)=>{
    await userItem.findOneAndDelete({
        userId,
        itemId
    })
    return {code:200}
}
// 获取购物车所有数据
const getAllItems = async (userId)=>{
    const resArr = await userItem.find({userId})
    let itemArr = [];
    // let shopInfo = {}
    for(let item of resArr){
        let shopInfo = {}
        // 把isChecked放进
        shopInfo.isChecked = item.isChecked
        // 把count放进shopInfo[0]里面
        shopInfo.count = item.count
        // 根据每个itemid查询 Items表里的商品数据
        shopInfo.data = await Items.findOne({itemid:item.itemId})
        
        itemArr.push(shopInfo)
    }
    return itemArr
}

// 关键词搜索
const keywordSearch = async (keyword)=>{
    const result = await Items.find({
        title:keyword
    })
    return result
}

// 获取所有商品数据
const getAll =  async ()=>{
    let result = await Items.find()
    return result
}
module.exports = {
    addItemToCart,
    removeItemFromCart,
    getAllItems,
    keywordSearch,
    getAll,
    changeTheCount,
    changeIsChecked,
    changeAllChecked
}
