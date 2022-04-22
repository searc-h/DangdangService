# 注册
> /api/users/login  --POST
#### 参数：username,password

# 登录
> /api/users/register  --post
#### 参数：username,password

# 添加到购物车
> /api/useritem/addtocart  --POST
#### 参数 userid,itemid
> 返回值：添加记录数据 data(重要busid)


# 从购物车删除
> /api/useritem/removetocart   --POST
#### 参数  userid,itemid

# 查询购物车所有数据
> /api/useritem/getallitems   --Post
#### 参数 userid
> 返回值：该用户购物车所有记录 data

# 关键词搜索
> /api/useritem/searchbykeyword  --GET
#### 参数 keyword
> 返回值：查询结果 data

# 查询所有商品
> /api/useritem/getall  --GET
#### 无参数
> 返回值：查询结果 data