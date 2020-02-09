// miniprogram/pages/detail/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startImg: '/images/start.png',
    richText: '',
    curtitle: '',
    curUrl: '',
    curAuthor: '',
    curArticleId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      curtitle: app.globalData.curtitle,
      curUrl: app.globalData.curUrl,
      curAuthor: app.globalData.curAuthor,
      curArticleId: app.globalData.curArticleId
    })
    this.checkStartToDB()
    this.getArcticleDetail()
    


    Date.prototype.Format = function(fmt) { //author: meizz   
      var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  getArcticleDetail() {
    
    wx.showLoading({
      title: '加载中'
    })
    var that = this
    var content = null
    try{
      content = wx.getStorageSync(that.data.curArticleId);
      console.log(content)
      that.setData({
        richText: content
      })
      if (content==""){
        wx.request({
          url: 'https://api.gugudata.com/news/fetchcontent',
          method: "POST",
          data: {
            appkey: 'PA4B7ZWUTZ6N',
            url: app.globalData.curUrl,
            contentwithhtml: true
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {

            that.setData({
              richText: res.data.Data.Content
            })
            
            wx.hideLoading()
            wx.setStorage({
              key: that.data.curArticleId,
              data: res.data.Data.Content,
            })
          }
        })
      }else{
        wx.hideLoading()
      }
      
    } catch(e){
      
    }
    
  },
  toStart(event) {
    if (this.data.startImg == '/images/start.png') {
      this.setData({
        startImg: '/images/start-active.png'
      })
      this.addStartToDB()

    } else {

      this.setData({
        startImg: '/images/start.png'
      })
      this.removeStartToDB()
    }

  },
  removeStartToDB() {
    console.log(this.data.curArticleId)
    const db = wx.cloud.database()
    db.collection('devUserCollection').doc(this.data.curArticleId).remove()
      .then("删")
      .catch(console.error)
  },
  addStartToDB() {
    console.log(this.data.curtitle)
    console.log(this.data.curUrl)
    var that = this
    var Temptittle = this.data.curtitle
    var Tempurl = this.data.curUrl
    var Tempauthor = this.data.curAuthor
    var TempId = this.data.curArticleId
    const db = wx.cloud.database()
    const todos = db.collection('devUserCollection')
    todos.add({
      data: {
        _id: TempId,
        ArticleTitle: Temptittle,
        ArticleSourceUrl: Tempurl,
        CreateDateTime: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        ArticleAuthor: Tempauthor
      }
    })
  },
  checkStartToDB() {
    var that = this
    console.log(this.data.curArticleId)
    wx.cloud.database().collection('devUserCollection').where({
        _id: this.data.curArticleId
      })
      .get({
        success(res) {
          console.log(res.data.length)
          if (res.data.length == 1) {
            that.setData({
              startImg: '/images/start-active.png'
            })

          } else {
            that.setData({
              startImg: '/images/start.png'
            })
          }
        }
      })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})