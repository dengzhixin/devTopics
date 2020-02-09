# Dev Topics开发者头条

> ####Dev Topics是一个专门开开发者观看技术头条的微信小程序，提供获取最新的技术文章、浏览、收藏等功能
>

## 技术分析

1. 使用了咕咕数据提供软件开发技术博文头条API
2. 使用云开发提供的数据库存储用户收藏

## 项目截图

![image-20200210011325743](/Users/dengzhixin/Desktop/桌面/项目/邓志鑫-17软件工程1班-15625653671-Dev Topics微信小程序/Dev Topics/readme/image-20200210011325743.png)

![image-20200210011502825](/Users/dengzhixin/Desktop/桌面/项目/邓志鑫-17软件工程1班-15625653671-Dev Topics微信小程序/Dev Topics/readme/image-20200210011502825.png)![image-20200210011350472](/Users/dengzhixin/Desktop/桌面/项目/邓志鑫-17软件工程1班-15625653671-Dev Topics微信小程序/Dev Topics/readme/image-20200210011350472.png)

## 学习记录

1.  需要在微信小程序-详情-项目配置添加request合法域名，否则request无法正常访问![image-20200210010634971](/Users/dengzhixin/Desktop/桌面/项目/微信小程序项目-斑马会员/17231543028邓志鑫/ZebraPrime/readme/image-20200210010634971.png)

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

![image-20200210011233263](/Users/dengzhixin/Desktop/桌面/项目/微信小程序项目-斑马会员/17231543028邓志鑫/ZebraPrime/readme/image-20200210011233263.png)