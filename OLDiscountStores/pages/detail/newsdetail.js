// pages/detail/newsdetail.js

//获取服务器接口地址
const api = require('../../config/config.js');
//获取app应用实例
const app = getApp();
//wxParse用来解析html的
var WxParse = require('../../lib/wxParse/wxParse.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId: "",           //详情页的id
    newsDetailInfo: {
      title: "中央军委党的建设会议再次提醒全军：我们为什么出发",
      author: "人民日报",
      publishtime: "2018-08-22",
    },   //详情页数据
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _pushInfo = {};
    let that = this;

    for (let key in options) {
      _pushInfo[key] = decodeURIComponent(options[key]);
    }
    that.setData({
      newsId: _pushInfo.sourcesId
    });
    that.loadNewsDetialRequest();
  },

  /**
   * 请求资讯详情
   */
  loadNewsDetialRequest: function () {
    
    wx.showLoading({
      title: '请稍候...',
    })
    var that = this;
    wx.request({
      url: api.getNewsDetialUrl + that.data.newsId,
      success: function(res) {
        wx.hideLoading();
        let data = res.data;
        if (data.code === 0) {
          var article = `< !DOCTYPE HTML ><!--注释: wxParse试验文本-->
      <div style="text-align:center;margin-top:10px;">
		<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534855491092&di=00b486dbdb03d09d03eeddf6eb047cec&imgtype=0&src=http%3A%2F%2Fwww.znsfagri.com%2Fuploadfile%2Feditor%2Fimage%2F20170626%2F20170626151136_11631.jpg" alt="wxParse-微信小程序富文本解析组件Logo">
		<h1 style="color:red;">wxParse-微信小程序富文本解析组件</h1>
		<h2 >支持Html及markdown转wxml可视化</h2>
	</div>
	<div style="margin-top:10px;">
		<h3 style="color: #000;">支持video</h3>
		<div style="margin-top:10px;">
			<video src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"></video>
		</div>
	</div>
	</div>
	<!--ap-->
    `;
          WxParse.wxParse('article_content', 'html', article, that, 5);

        } else {
          that.showInfo('获取详情失败,请稍候再试', 'none')
        }
      },
      error: function (err) {
        wx.hideLoading();
        that.showInfo(err, 'error')
      }
    })
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
    
  },

  /**
  * showToast的封装
  */
  showInfo: function (info, icon = 'none') {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 1500,
      mask: true
    });
  },
})