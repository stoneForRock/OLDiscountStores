// pages/news/newslist.js

//获取服务器接口地址
const api = require('../../config/config.js');
//获取app应用实例
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {

    //顶部布局的数据
    topSwiperList: [],    //顶部选项卡数据

    showLoading: false,   //是否显示正在加载
    currentIndex: 0,      //当前选择的选项卡Index
    topTabWidth: 0,       //顶部每个tab的宽度
    topTabScrollLeft: 0,  //上方滚动的距离
    topScrollWidth: 0,     //可滚动区域的大小

    //下方布局的数据
    pageIndex: 0,
    pageSize:10,
    newsList: [{
      id: '1',
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534855491092&di=00b486dbdb03d09d03eeddf6eb047cec&imgtype=0&src=http%3A%2F%2Fwww.znsfagri.com%2Fuploadfile%2Feditor%2Fimage%2F20170626%2F20170626151136_11631.jpg',
      name: '网络图片',
      like: '19201',
      scan: '32345'
    }, {
        id: '2',
        src: '../../images/02.jpg',
        name: '照片02',
        like: '19201',
        scan: '32345'
      }, {
        id: '3',
        src: '../../images/03.jpg',
        name: '照片03',
        like: '19201',
        scan: '32345'
      }, {
        id: '4',
        src: '../../images/04.jpg',
        name: '照片04',
        like: '19201',
        scan: '32345'
      }, {
        id: '5',
        src: '../../images/05.jpg',
        name: '照片05',
        like: '19201',
        scan: '32345'
      }, {
        id: '6',
        src: '../../images/06.jpg',
        name: '照片06',
        like: '19201',
        scan: '32345'
      }, {
        id: '7',
        src: '../../images/01.jpg',
        name: '照片07',
        like: '19201',
        scan: '32345'
      }],         //资讯列表数据
  },

  //----------页面生命周期
  onLoad: function (options) {

    this.loadTopOptionBarList();

    let _lauchInfo = {};
    let that = this;

    for (let key in options) {
      _lauchInfo[key] = decodeURIComponent(options[key]);
    }
    if (_lauchInfo.id) {
      // this.turuDetailPage(_lauchInfo.id);
    }
  },

  //界面出现的时候
  onShow: function () {
    this.fromartUIData();
  },

  //初始化tabIndex的界面
  fromartUIData: function () {
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    // console.log('windowWidth---' + windowWidth);
    var signalTabWidth = windowWidth / 3;
    var canScrollWidth = windowWidth * 2;
    // console.log('canScrollWidth1---' + canScrollWidth);
    var topSwiperWidth = this.data.topSwiperList.length * signalTabWidth;
    if (canScrollWidth < topSwiperWidth) {
      canScrollWidth = topSwiperWidth;
    }
    // console.log('canScrollWidth2---' + canScrollWidth);
    this.setData({
      topTabWidth: signalTabWidth,
      topScrollWidth: canScrollWidth,
    });
  },

  //----------通用方法

  showInfo: function (info, icon = 'none') {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 1500,
      mask: true
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我发现了一个不错的小程序，分享给你吧',
      path: '/pages/news/newslist',
      imageUrl: '/images/04.jpg',
      success: function (res) {
        // 转发成功
        console.log('转发成功');
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败')
      }
    }
  },


  //----------页面响应相关

  //点击上方的选项卡的回调，进行切换页面
  changeview: function (e) {
    var crash_current = e.currentTarget.dataset.current;
    var distance = 0;
    if (crash_current != 0 && crash_current != 1) {
      distance = parseInt(crash_current - 1) * this.data.topTabWidth;
    }
    this.setData({
      currentIndex: e.currentTarget.dataset.current,
      topTabScrollLeft: distance,
      pageIndex: 0,
    });

    this.loadTabDatasourceRequest(this.data.currentIndex);
  },

  //点击单个卡片，跳转详情
  goDetail: function (e) {
    let newsId = e.currentTarget.id;
    console.log('点击卡片的内容 ' + newsId);
    this.turuDetailPage(newsId);
  },

  turuDetailPage: function (newsId) {
    let navigateUrl = '../detail/newsdetail?sourcesId=' + newsId;
    wx.navigateTo({
      url: navigateUrl,
    })
  },

  //----------数据请求相关

  //拉取顶部选项卡数据
  loadTopOptionBarList: function () {
    wx.showLoading({
      title: '请稍候...',
    })
    var that = this;
    wx.request({
      url: api.getNewsListOptionsBarListUrl,
      success: function (res) {
        wx.hideLoading();
        let data = res.data;
        console.log(data);
        var recommendArray = [{
          deleteFlag:0,
          id: '',
          title: '推荐',
        }];
        if (data.code === 0 && data.data.length > 0) {
          recommendArray = recommendArray.concat(data.data);
        }
        that.setData({
          topSwiperList: recommendArray,
          currentIndex: 0,
          pageIndex: 0,
        });
        that.loadTabDatasourceRequest(that.data.currentIndex);
      },
      error: function (err) {
        wx.hideLoading();
        that.showInfo(err, 'error')
      }
    })
  },

  //获取对应tab index的页面数据
  loadTabDatasourceRequest: function (barIndex = 0) {
    wx.showNavigationBarLoading();
    var barItemInfo = this.data.topSwiperList[barIndex];
    var that = this;
    wx.request({
      url: api.getNewsListUrl,
      data: {
        args: barItemInfo.id,
        page: that.data.pageIndex,
        pageSize: that.data.pageSize,
      },
      success: function(res) {
        that.endRefreshForTabInfo();
        let data = res.data;
        console.log(data);
        // var newArray = that.data.newsList.concat(that.data.newsList.concat);
        // that.setData({
        //   newsList: newArray,
        // });
      },
      error: function(err) {
        that.endRefreshForTabInfo();
        that.showInfo(err,'error')
      }
    })
  },

  endRefreshForTabInfo: function () {
    wx.hideNavigationBarLoading();//隐藏导航条加载动画。
    wx.stopPullDownRefresh();//停止当前页面下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉页面触底');
    let currentPageIndex = this.data.pageIndex+1;
    this.setData({
      pageIndex: currentPageIndex,
    });
    this.loadTabDatasourceRequest(this.data.currentIndex);
  },

  //下拉刷新的回调
  onPullDownRefresh: function () {
    this.setData({
      pageIndex: 0,
    });
    this.loadTabDatasourceRequest(this.data.currentIndex);
  },

})
  