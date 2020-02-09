//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    devTopicsData:'',
    devTopicsPageIndex:0,
    isload:false
  },

  onLoad: function() {
    var that = this
    that.data.isload=true
    this.getDevOptics(1,(res)=>{
      this.setData({
        devTopicsData: res.data.Data
      })
     
    })
    
    

  },
  // 下拉刷新
  onPullDownRefresh() {
    var that = this
    if (that.data.isload) { return }

    that.getDevOptics(1, (res) => {
      that.setData({
        devTopicsData: res.data.Data
      })
      wx.stopPullDownRefresh()


    })
  },
  // 上拉加载
  onReachBottom() {
    var that = this
    if (that.data.isload){return}
    
    that.getDevOptics(that.data.devTopicsPageIndex+1,(res)=>{
      
      that.setData({
        devTopicsData: that.data.devTopicsData.concat(res.data.Data)
      })
      
    })
    
  },
  getDevOptics(index,callback){
    this.data.devTopicsPageIndex=index
    let that = this
    wx.showLoading({
      title:'加载中'
    })
    wx.request({
      url: 'https://api.gugudata.com/news/techblogs', // 
      data: {
        appkey: 'Q2HM5SWU2A6S',
        pagesize: 10,
        pageindex: index
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        wx.hideLoading()
        for (var i = 0, len = res.data.Data.length; i < len; i++) {
          
          res.data.Data[i].CreateDateTime = app.getDateDiff(res.data.Data[i].CreateDateTime)
        }
        that.data.isload = false
        callback(res)
      }
    })
    
  },
  intoDetailPage(event){
    app.intoDetailPage(event)
  }





})
