# Dev Topics开发者头条

> ####Dev Topics是一个专门开开发者观看技术头条的微信小程序，提供获取最新的技术文章、浏览、收藏等功能
>

## 技术分析

1. 使用了咕咕数据提供软件开发技术博文头条API
2. 使用云开发提供的数据库存储用户收藏

## 项目截图

![https://github.com/dengzhixin/devTopics/blob/master/readme/%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D1.png?raw=true](https://github.com/dengzhixin/devTopics/blob/master/readme/%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D1.png?raw=true)

![t2](https://github.com/dengzhixin/devTopics/blob/master/readme/%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D2.png?raw=true)

![](https://github.com/dengzhixin/devTopics/blob/master/readme/%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D3.png?raw=true)



## 学习记录

1.  需要在微信小程序-详情-项目配置添加request合法域名，否则request无法正常访问![image-20200210010634971](https://github.com/dengzhixin/devTopics/blob/master/readme/i1.png?raw=true)

2. 通过 <rich-text></rich-text>标签的 nodes属性可以解析富文本

   

3. 获取云开发数据库收藏的文字

   ```javascript
   const db = wx.cloud.database()
         db.collection('devUserCollection')
           .where({
             _openid: app.globalData.openid, // 填入当前用户 openid
           })
           .limit(that.data.pageSize) // 限制返回数量为 10 条
           .get()
           .then(res => {
             that.data.devMyTopicsData = res.data
             that.devMyTopicsDataFormat()
             wx.hideLoading()
           })
           .catch(err => {
             console.error(err)
           })
   ```

![image-20200210011233263](https://github.com/dengzhixin/devTopics/blob/master/readme/i2.png?raw=true)