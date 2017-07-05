Page({
  data: {
      newsList:[],
      num: 1
  },
  gotoInfo: function(e) {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/info/info?news_id='+id,
      });
  },
  goOtherCate: function(e) {
     var that = this,
         index = e.currentTarget.dataset.index;
     this.setData({
        num: index
     }),
     wx.request({
       url: 'http://api.dagoogle.cn/news/get-news?pagesize=10&tableNum='+index,
       header: {
         'content-type': 'application/json'
       },
       success: function (r) {
         //console.log(r.data.data);
         that.setData({
           newsList: r.data.data
         });
       }
     });
  },
  onLoad: function (options) {
    // Do some initialize when page load.
    var that = this;
    wx.request({
      url: 'http://api.dagoogle.cn/news/get-news?pagesize=10&tableNum=1',
      header: {
          'content-type': 'application/json'
      },
      success: function(r) {
        //console.log(r.data.data);
          that.setData({
            newsList: r.data.data
          });
      }
    });
  },
  onReady: function () {
    // Do something when page ready.
  },
  onShow: function () {
    // Do something when page show.
  },
  onHide: function () {
    // Do something when page hide.
  },
  onUnload: function () {
    // Do something when page close.
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  }
});