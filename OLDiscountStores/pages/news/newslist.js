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
      }, {
        id: '8',
        src: '../../images/03.jpg',
        name: '照片08',
        like: '19201',
        scan: '32345'
      }, {
        id: '9',
        src: '../../images/01.jpg',
        name: '照片09',
        like: '19201',
        scan: '32345'
      }, {
        id: '10',
        src: '../../images/02.jpg',
        name: '照片10',
        like: '19201',
        scan: '32345'
      }, {
        id: '11',
        src: '../../images/04.jpg',
        name: '照片11',
        like: '19201',
        scan: '32345'
      }, {
        id: '12',
        src: '../../images/05.jpg',
        name: '照片12',
        like: '19201',
        scan: '32345'
      }, {
        id: '13',
        src: '../../images/06.jpg',
        name: '照片13',
        like: '19201',
        scan: '32345'
      }, {
        id: '14',
        src: '../../images/02.jpg',
        name: '照片14',
        like: '19201',
        scan: '32345'
      }, {
        id: '15',
        src: '../../images/05.jpg',
        name: '照片15',
        like: '19201',
        scan: '32345'
      }, {
        id: '16',
        src: '../../images/03.jpg',
        name: '照片16',
        like: '19201',
        scan: '32345'
      }, {
        id: '17',
        src: '../../images/06.jpg',
        name: '照片17',
        like: '19201',
        scan: '32345'
      },],         //资讯列表数据
    contentHeight: 0,     //资讯列表内容的高度
  },

  //----------页面生命周期
  onLoad: function () {
    this.loadTopOptionBarList();
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
      contentHeight: windowHeight - 80,
      topScrollWidth: canScrollWidth,
    });
  },


  showInfo: function (info, icon = 'none') {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 1500,
      mask: true
    });
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
      topTabScrollLeft: distance
    });

    this.loadTabDatasourceRequest(this.data.currentIndex);
  },

  //点击单个卡片，跳转详情
  goDetail: function (e) {
    let info = e.currentTarget.dataset;
    console.log('点击响应事件' + info);
    // wx.navigateTo({
    //   url: '../detail/newsdetail',
    // })
  },

  //----------数据请求相关

  //下拉刷新的回调
  onPullDownRefresh: function () {
    this.loadTabDatasourceRequest(this.data.currentIndex);
  },

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
        if (data.code === 0 && data.data.length > 0) {
          setTimeout(function () {
            that.setData({
              topSwiperList: data.data,
              currentIndex: 0,
            });

            that.loadTabDatasourceRequest(that.data.currentIndex);
          }, 800);
        }
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
        itemId: barItemInfo.id
      },
      success: function(res) {
        that.endRefreshForTabInfo();
        let data = res.data;
        console.log(data);
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
})
  