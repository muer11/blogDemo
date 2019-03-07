/***
 * 
 *统一定义接口，有利于维护 
 * 
 **/

const URL = {
    // user 用户 #该用户名、邮箱、手机号是否已存在
    loginUrl: '/api/user/doLogin', //登录
    logoutUrl: '/api/user/logout', //退出登录
    isLoginUrl: '/api/user/isLogin', //判断用户是否已登录
    registerUrl: '/api/user/doRegister', //注册

    // tag 文章分类 
    showTagsUrl: '/api/tag/showTags', //显示标签
    addTagUrl: '/api/tag/addTag', //添加标签
    delTagUrl: '/api/tag/delTag', //删除标签

    // article 文章
    doRecordingUrl: '/api/article/doRecording', //发表文章（新建）
    editRecordingUrl: '/api/article/editRecording', //编辑文章
    getArticleUrl: '/api/article/getArticle', //获取所有文章
    getTagArticleUrl: '/api/article/getTagArticle', //获取分类文章-前台
    findOneArticleUrl: '/api/article/findOneArticle', //获取单篇文章
    delArticleUrl: '/api/article/delArticle', //删除文章
    
    // comment 评论
    doCommentUrl: '/api/comment/doComment', //发表评论
    getCommentUrl: '/api/comment/getComment', //获取评论
    
    // like 点赞
    doLikeUrl: '/api/like/doLike', //为文章点赞
    sumLikeUrl: '/api/like/sumLike', //为评论点赞

};

export default URL;
