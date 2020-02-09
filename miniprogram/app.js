//app.js
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      curUrl: 'https://mp.weixin.qq.com/s/CpDZEqo14X_lCBh6i7feIA',
      openid:''
    }
  },
  getDateTimeStamp(dateStr) {
    return Date.parse(dateStr.replace(/-/gi, "/"));
  }
  ,
  getDateDiff(dateStr) {
    var publishTime = this.getDateTimeStamp(dateStr) / 1000,
      d_seconds,
      d_minutes,
      d_hours,
      d_days,
      timeNow = parseInt(new Date().getTime() / 1000),
      d,

      date = new Date(publishTime * 1000),
      Y = date.getFullYear(),
      M = date.getMonth() + 1,
      D = date.getDate(),
      H = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
    //小于10的在前面补0
    if (M < 10) {
      M = '0' + M;
    }
    if (D < 10) {
      D = '0' + D;
    }
    if (H < 10) {
      H = '0' + H;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }

    d = timeNow - publishTime;
    d_days = parseInt(d / 86400);
    d_hours = parseInt(d / 3600);
    d_minutes = parseInt(d / 60);
    d_seconds = parseInt(d);

    if (d_days > 0 && d_days < 3) {
      return d_days + '天前';
    } else if (d_days <= 0 && d_hours > 0) {
      return d_hours + '小时前';
    } else if (d_hours <= 0 && d_minutes > 0) {
      return d_minutes + '分钟前';
    } else if (d_seconds < 60) {
      if (d_seconds <= 0) {
        return '刚刚发表';
      } else {
        return d_seconds + '秒前';
      }
    } else if (d_days >= 3 && d_days < 30) {
      return M + '-' + D + '&nbsp;' + H + ':' + m;
    } else if (d_days >= 30) {
      return Y + '-' + M + '-' + D + '&nbsp;' + H + ':' + m;
    }
  },
  getOpenid(callback){
    console.log("asda")
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'login',

      success: res => {
        console.log(res.result.openid)
        this.globalData.openid = res.result.openid
        callback()
      },
      fail: err => {
        // handle error
      },
      complete: () => {
        // ...
      }
    })
  },
  intoDetailPage(event) {
    console.log(event)
    this.globalData.curUrl = event.currentTarget.dataset.src
    this.globalData.curtitle = event.currentTarget.dataset.curtitle
    this.globalData.curAuthor = event.currentTarget.dataset.author
    this.globalData.curArticleId = event.currentTarget.dataset.articleid
    
    wx.navigateTo({
      url: '/pages/detail/detail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

})