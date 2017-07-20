Page({
    data: {
      info: {}
    },
    onLoad: function(options) {
        var that = this,
            id = options.news_id,
            index = options.tableNum;
        console.log(id);
        wx.request({
          url: 'http://api.dagoogle.cn/news/single-news?tableNum=' + index +'&news_id='+id,
          header: {
            'content-type': 'application/json'
          },
          success: function (r) {
            that.setData({
              info: r.data.data
            });
          }
        })
    }
});