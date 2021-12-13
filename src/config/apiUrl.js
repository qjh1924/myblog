let ipUrl = 'http://localhost/default/'

let servicePath = {
    getArticleList: ipUrl+'getArticleList',  //首页接口
    getArticleById: ipUrl+'getArticleById/',  //详细页接口
    getTypeInfo: ipUrl+'getTypeInfo',   //文章类别接口
    getListById: ipUrl+'getListById/',  //根据类别ID获取文章列表
    getMessagesById: ipUrl+'getMessagesById/',   // 根据文章ID获取留言
    addMessage: ipUrl+'addMessage'  // 新增留言
}

export default servicePath