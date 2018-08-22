


// 服务器域名
const baseUrl = 'https://118.24.80.76:8012/';

// 获取资讯列表
const getNewsListUrl = baseUrl + 'api/article/list';

// 获取资讯详情-'https://118.24.80.76:8012/api/article/detail/{id}'
const getNewsDetialUrl = baseUrl + 'api/article/detail/';

// 点赞
const likedSourceUrl = baseUrl + 'api/article/liked/';

//获取首页上方选项卡的数据
const getNewsListOptionsBarListUrl = baseUrl + 'api/article/columns';

module.exports = {
  getNewsListUrl: getNewsListUrl,
  getNewsDetialUrl: getNewsDetialUrl,
  likedSourceUrl: likedSourceUrl,
  getNewsListOptionsBarListUrl: getNewsListOptionsBarListUrl
};