Page({
  data: {
      newsList:[],
      weather: [],
      open: false,//是否能滑动的标示
      num: 1,//新闻类型
      add: 1,//加载第几页的新闻
      mark: 0,
      newMark: 0,
      startMark: 0,
      endMark: 0,
      newsType: 1,
      status: 1, //向右滑动标志，向左为0
      toRight: true,
      windowWidth: wx.getSystemInfoSync().windowWidth,
      transition: ''
  },
  //跳转找新闻详情页
  gotoInfo: function(e) {
      var id = e.currentTarget.dataset.id,
          index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '/pages/info/info?news_id=' + id + '&tableNum=' + index,
      });
  },
  //新闻类型切换
  goOtherCate: function(e) {
     var that = this,
         index = e.currentTarget.dataset.index;
     this.setData({
        num: index,
        add: 1
     }),
     wx.request({
       url: 'http://api.dagoogle.cn/news/get-news?pagesize=10&tableNum='+index,
       header: {
         'content-type': 'application/json'
       },
       success: function (r) {
         //console.log(r.data.data);
         that.setData({
           newsList: r.data.data,
           newsType: index
         });
       }
     });
  },
  //加载更多
  addMore: function(e) {
      var that = this,
          next = this.data.add + 1,
          url = 'http://api.dagoogle.cn/news/get-news?pagesize=10&tableNum=' + this.data.num +'&page='+next;

      this.setData({
          add: next
      });

      wx.request({
        url: url,
        header: {
          'content-type': 'application/json'
        },
        success: function (r) {
          that.setData({
            newsList: that.data.newsList.concat(r.data.data)
          });
          console.log(that.data.newsList);
        }
      }); 
      
  },
  //返回顶部
  goTop: function(e) {
      //没有合适的方法
  },

  /* 已下为页面右滑呼出其他信息 */
  slideStart: function(e) {
      this.data.mark = this.data.newMark = e.touches[0].pageX;

      this.data.startMark = e.touches[0].pageX;

  },
  slideMove: function(e) {
      var that = this,
          xNum;
     
      this.data.newMark = e.touches[0].pageX;

      xNum = this.data.newMark - this.data.startMark;
      //console.log(xNum);

      //向右滑动
      if(this.data.startMark < this.data.newMark && this.data.status == 1){


        if (this.data.windowWidth * 0.7 > Math.abs(xNum)){

            this.setData({
              transition: 'transform: translateX(' + xNum + 'px)'
            });

        } else {

            this.setData({
              transition: 'transform: translateX(' + that.data.windowWidth * 0.7 + 'px)'
            });
        }
      }
    

      // if (this.data.mark > this.data.newMark) {
          
      //     this.setData({
      //       translate: 'transform: translateX(' + (-xNum) + 'px)'
      //     }); 
                  
      // }
      //console.log(xNum);

      this.data.mark = this.data.newMark;

  },
  slideEnd: function(e) {
      var that = this;
      
      if(this.data.status == 1 && this.data.newMark > this.data.startMark) {
        this.setData({
          transition: 'transform: translateX(0px)'
        });
      }
  },









  //这种呼出效果比较生硬，适合点击某一个按钮后弹出效果；
  // slideStart: function(e) {
  //     this.data.mark = this.data.newMark = e.touches[0].pageX;
  //     //console.log(e);
  // },
  // slideMove: function(e) {
  //     var that = this;
  //     this.data.newMark = e.touches[0].pageX;
  //     //右滑
  //     if(this.data.mark < this.data.newMark) {
  //         that.setData({
  //             toRight: true
  //         });
  //     }
  //     //左滑
  //     if(this.data.mark > this.data.newMark) {
  //         that.setData({
  //             toRight: false
  //         });
  //     }
  //     this.data.mark = this.data.newMark;
  // },
  // slideEnd: function(e) {
  //     this.data.mark = this.data.newMark = 0;
  //     if(this.data.toRight) {
  //         this.setData({
  //             open: true
  //         });
  //     } else {
  //         this.setData({
  //             open: false
  //         })
  //     }
  // },
  /* 已上为页面右滑呼出其他信息 */

  //监听页面加载
  onLoad: function (options) {
    // Do some initialize when page load.
    var that = this;

    //获取新闻信息
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
    //获取当前位置，返回的是经纬度
    wx.getLocation({
      success: function (res) {
        console.log(res);
      }
    });
    //获取当地天气（当前写死为郑州的天气）
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=郑州',
      success: function(r) {
          that.setData({
            weather: r.data.data.forecast
          });
      }
    })
    
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