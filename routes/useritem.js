let express = require('express');
let router = express.Router();
const {SuccessModel, ErrorModel} = require('../model/resModel')
const {
    addItemToCart ,
    removeItemFromCart,
    getAllItems,
    keywordSearch,
    getAll,
    changeTheCount,
    changeIsChecked,
    changeAllChecked
} = require('../controller/useritem');
const loginCheck = require('../middleware/loginCheck.js')
// 添加到购物车
router.post('/addtocart',function(req , res, next){
    // const {userid,itemid} = req.query
    const {userid,itemid} = req.body
    let result = addItemToCart(userid,itemid)
    
    result.then(data=>{
        console.log(data)
        if(data){
            res.json(
                new SuccessModel(data,'添加成功')
            )
            return
        }
        res.json(
            new ErrorModel('添加失败')
        )
    })
})

// 修改数量
router.post('/changecount',loginCheck,function(req,res,next){
    // const {userid,itemid,count} = req.query
    const {userid ,itemid ,count} = req.body
    let result = changeTheCount(userid,itemid,count)
    result.then(data=>{
        if(data){
            res.json(
                new SuccessModel(data,'修改成功')
            )
            return
        }
        res.json(
            new ErrorModel('修改失败')
        )
    })
})
// 修改勾选
router.post('/changechecked',loginCheck,function(req,res,next){
    let {userid, itemid, ischecked} = req.body
    let result = changeIsChecked(userid, itemid, ischecked)
    result.then(data=>{
        if(data){
            res.json(
                new SuccessModel(data,'勾选修改成功')
            )
            return
        }
        res.json(
            new ErrorModel('勾选修改失败')
        )
    })
})
// 修改全选
router.post('/changeallchecked',loginCheck,function(req,res,next){
    let {userid,ischecked} = req.body
    let result = changeAllChecked(userid, ischecked)
    result.then(data=>{
        if(data){
            res.json(
                new SuccessModel(data,'勾选修改成功')
            )
            return
        }
        res.json(
            new ErrorModel('勾选修改失败')
        )
    })
})
// 从购物车删除
router.post('/removetocart',loginCheck,function(req , res, next){
    // const {userid,itemid} = req.query
    const {userid,itemid} = req.body
    const result = removeItemFromCart(userid,itemid)
    result.then(data=>{
        if(data){
            res.json(new SuccessModel('删除成功'))
            return
        }

        res.json(new ErrorModel('删除失败'))
    })
})

// 查询购物车所有数据
router.post('/getallitems',loginCheck,function(req,res, next){
    // const {userid} = req.query
    const {userid} = req.body
    let result = getAllItems(userid)
    result.then(data=>{
        
        if(data.length!=0){
            res.json(new SuccessModel(data,'全部查询完成'))
            return 
        }
        res.json(new ErrorModel('没有查询到任何数据'))
    })
})

// 查询所有数据
router.get('/getall',function(req, res ,next){
    let result = getAll()
    result.then(data=>{
        res.json(
            new SuccessModel(data,'全部获取')
        )
    })
})
// 关键词搜索
router.get('/searchbykeyword' , function(req, res,next){
    let {keyword} = req.query
    let result = keywordSearch(keyword)
    result.then(data=>{
        if(data){
            res.json(
                new SuccessModel(data,'搜索完毕')
            )
            return 
        }
    })
})

module.exports = router


