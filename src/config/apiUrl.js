let ipUrl = 'http://localhost:8182/article/'

let servicePath = {
    // 获取网站计数
    getWebsiteCounts: ipUrl + 'getWebsiteCounts',
    // 动态获取最新的文章列表
    getLatestArticles: ipUrl + 'getLatestArticles/',
    // 根据类别ID获取文章列表
    getListById: ipUrl+'getListByTypeId/',
    // 根据id获取文章内容
    getArticleById: ipUrl+'getArticleById/',
    // 根据文章ID获取留言
    getMessagesById: ipUrl+'getMessagesById/',
   // 新增留言 
    addMessage: ipUrl+'addMessage',
    //文章类别接口
    getTypeInfo: ipUrl+'getTypeInfo',
}

export default servicePath