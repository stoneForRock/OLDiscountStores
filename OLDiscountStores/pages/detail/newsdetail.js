// pages/detail/newsdetail.js

//获取服务器接口地址
const api = require('../../config/config.js');
//获取app应用实例
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId: "",   //详情页的id
    
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