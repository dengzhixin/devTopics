// miniprogram/pages/myArcticle/myArcticle.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devMyTopicsData:[],
    isNull:false,
    pageSize:10,
    paegIndex:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
  },
  getMyArcticle(pageIndex){
    
    var that = this
    var skip = that.data.pageSize * (pageIndex - 1)
    if(skip!=0){
      const db = wx.cloud.database()
      db.collection('devUserCollection')
        .where({
          _openid: app.globalData.openid, // 填入当前用户 openid
        })
        .skip(that.data.pageSize * (pageIndex - 1)) // 跳过结果集中的前 10 条，从第 11 条开始返回
        .limit(that.data.pageSize) // 限制返回数量为 10 条
        .get()
        .then(res => {
          that.data.devMyTopicsData = res.data
          that.devMyTopicsDataFormat()
        })
        .catch(err => {
          console.error(err)
        })
    }else{
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
    }
    
    

  },
  devMyTopicsDataFormat(){
    
    if (this.data.devMyTopicsData.length==0){
      
      this.setData({
        isNull:true
      })
      return;
    }else{
      this.setData({
        isNull: false
      })
    }
    
    
    for (var i = 0, len = this.data.devMyTopicsData.length; i < len; i++){
      
      this.data.devMyTopicsData[i].CreateDateTime = app.getDateDiff(this.data.devMyTopicsData[i].CreateDateTime)
    }
    this.setData({
      devMyTopicsData:this.data.devMyTopicsData
    })
  },
  
  intoDetailPage(event) {
    app.intoDetailPage(event)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if (app.globalData.openid == '') {
      app.getOpenid(function () {
        console.log(app.globalData.openid)
        that.getMyArcticle(that.data.paegIndex)
      })
    } else {
      that.getMyArcticle(that.data.paegIndex)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})