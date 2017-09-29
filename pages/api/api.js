// api.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUpList: [],
    imgInfo: '',
    startTxt: '',
    voiceTxt: '',
    path: '',
    flag: false,
    bgm: '',
    state: false,
    audioSrc: '',
    tip: '',
    location: ''
  
  },
  /*wx.chooseImage选择本地图片*/
  chooseImg: function(e) {
    var that = this;
      wx.chooseImage({
          count: 8,
          sizeType: ['original','compressed'],
          success: function(res) {
             that.setData({
               imgUpList: res.tempFilePaths
             });
          }
      });
  },
  /* wx.previewImage图片预览  */
  previewImg: function(e) {
    wx.previewImage({
      urls: ['http://static.gcimg.net/i/201610/xFZcENcszq.png','http://static.gcimg.net/i/201610/qWAJ55t6ui.png'],
    })
  },
  /* 获取图片信息 */
  getImgInfo: function(e) {
    var that = this;
    wx.getImageInfo({
      src: 'http://static.gcimg.net/i/201708/sUV59LORob.png',
      success: function(res) {
        that.setData({
          imgInfo: '图片的高是'+res.height+'宽是'+res.width+'路径是'+res.path
         
        });

      }
    });
  },
  /* 开始录音 */
  startR: function() {
    var that = this;
    wx.startRecord({
      success: function(res) {
        that.setData({
          startTxt: '录音成功，录音文件路径是：'+res.tempFilePath,
          path: res.tempFilePath,
          flag: true
        });
      }
    });
  },
  /* 结束录音 */
  stopR: function() {
    wx.stopRecord();
  },

  /* 播放音频 */
  playV: function() {
    var that = this;
    wx.playVoice({
      filePath: that.data.path,
      success: function() {
        that.setData({
          voiceTxt: '开始播放'
        });
        console.log(that.data.path);
      }
    });
  },
  /* 暂停音频 */
  pauseV: function () {
    wx.pauseVoice();
  },
  /* 播放背景音乐 */
  playA: function() {
    var that = this;
    wx.playBackgroundAudio({
      dataUrl: 'http://www.w3school.com.cn/i/song.mp3',
      //dataUrl: '/file/voice.mp3',
      title: '心雨',
      coverImgUrl: 'http://pic.xiami.net/images/album/img68/2368/127591393814322.jpg',
      success: function() {
        that.setData({
          bgm: '背景音乐播放中',
          state: true
        })
      }
    })
  },
  /* 获取背景音乐状态 */
  getState: function() {
    var that = this;
    wx.getBackgroundAudioPlayerState({
      success: function(res) {
        that.setData({
          bgm: '播放状态是：'+res.status+',音乐地址是：'+res.dataUrl
        })
      }
    });
  },
  /* 控制音乐播放进度 */
  bgmSeek: function() {
    var that = this;
    wx.seekBackgroundAudio({
      position: 5,
      success: function() {
        that.setData({
          bgm: '播放进度设置成功'
        });
      }
    });
  },
  /* 暂停音乐 */
  bgmPause: function() {
    var that = this;
    wx.pauseBackgroundAudio();
  },
  
  /* 停止播放 */
  bgmStop: function() {
    wx.stopBackgroundAudio();
  },

  /* 视频选择 */
  chooseV: function() {
    var that = this;
    //选取视频
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: '30',
      camera: 'front',
      success: function(res) {
        var _url = res.tempFilePath;
        that.setData({
          tip: '视频选取成功,其路径是：'+_url+',视频大小是：'+res.size+'视频的时长是：'+res.duration
        });
        //保存视频
        wx.saveVideoToPhotosAlbum({
          filePath: _url,
          success: function(){
            that.setData({
              tip: '保存成功'
            })
          }
        });
        //上传视频
        wx.uploadFile({
          url: 'http://127.0.0.1:8080/',
          filePath: _url,
          name: '味食记',
          success: function() {
            that.setData({
              tip: '上传成功'
            })
          }
        })
      }
    })
  },


  //下载文件
  downFile: function() {
    var that = this;
    wx.downloadFile({
      url: 'http://127.0.0.1:8080/movie.ogg',
      success: function(res) {
        var _url = res.tempFilePath;
        that.setData({
          tip: '下载成功'
        });
        wx.saveFile({
          tempFilePath: _url,
          success: function(r) {
            that.setData({
              tip: r.savedFilePath
            });
          }
        })
      },
      fail: function(res) {
        that.setData({
          tip: res.errMsg
        });
        console.log(res);
      }
    })
  },

  //setStorage
  setS: function() {
    wx.setStorage({
      key: 'name',
      data: 'zhang',
    });
  },

  //getlocation
  getL: function() {
    var that = this;
    wx.getLocation({
      success: function(res) {
        that.setData({
          location: '经度是：'+res.longitude+',纬度是：'+ res.latitude
        })
      },
    })
  },
  chooseL: function() {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          location: '位置是：'+res.name+',详细地址：'+res.address 
        });
      },
    })
  },

  openL: function() {
    var that = this;
    wx.openLocation({
      latitude: 34.7466,
      longitude: 113.6253,
    });
  },

  getSys: function() {
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
      },
    })
  },

  getNet: function() {
    wx.getNetworkType({
      success: function(res) {
        console.log(res);
      },
    });
    wx.makePhoneCall({
      phoneNumber: '15003876468' 
    })
  },













































  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
    wx.onBackgroundAudioPlay(function () {
      console.log('开始播放');
    });

    // var audioM = wx.getBackgroundAudioManager();
    // audioM.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    // audioM.title = '此时此刻';
    // adioM.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000';

    var myAduio = wx.createAudioContext('myaudio');
    myAduio.setSrc = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46';
    myAduio.play();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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