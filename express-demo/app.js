var express      = require("express");
var app          = express();
var path         = require('path');
var bodyParser   = require('body-parser');
var ejs          = require('ejs');
var ueditor      = require('ueditor');
var session = require('express-session');
var NedbStore = require('nedb-session-store')(session);
var mongoose = require("./config/mongoose");
var db = mongoose();

//使用session
const sessionMiddleware = session({
    secret: 'blogSession',
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: 1000 * 60
    },
    store: new NedbStore({
        filename: 'path_to_nedb_persistence_file.db'
    })
});
app.use(sessionMiddleware);

//拦截用户登录信息
// app.get("/", function (req, res, next) {
//     console.log("-------/-------")
//     console.log(req.session);
//     if (typeof req.session.username == "undefined" && req.url != "/user/doLogin") {
//         //     res.json({
//         //         ret_code: 0,
//         //         username: req.session.username,
//         //         role: req.session.role
//         //     });
//         //     return true;
//         res.json({
//             ret_code: 1,
//             ret_msg: "账号未登录"
//         })
//         return false;
//     }
//     next();
// });
app.post("/*", function (req, res, next) {
    console.log("-------/-------")
    console.log(req.session);
    if (typeof req.session.username == "undefined" && req.url != "/user/doLogin" && req.url != "/user/doRegister") {
        res.json({
            success: false,
            code: 102, //无接口访问权限
            msg: "请先登录！",
            data: null
        });
        return false;
    }
    next();
});

const countersRouter = require("./routers/counter");
const userRouter = require("./routers/user");
const tagRouter = require("./routers/tag");
const articleRouter = require("./routers/article");
const commentRouter = require("./routers/comment");
const likeRouter = require("./routers/like");
app.use("/counters", countersRouter);
app.use("/user", userRouter);
app.use("/tag", tagRouter);
app.use("/article", articleRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(bodyParser.json());

app.use(express.static("./public"));

//ueditor
app.use("/libs/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {

    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var imgname = req.ueditor.filename;
        var img_url = '/upload';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/upload';
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/libs/ueditor/nodejs/config.json')
    }

}));
//模板引擎
app.set("view engine","ejs");


//首页
// app.get("/",router.showIndex);
// //编写页面
// app.get("/recording", router.showRecording);
// //执行保存
// app.post("/doRecording", router.doRecording);
// //编辑文章
// app.post("/editRecording", router.editRecording);

// //取得文章
// app.get("/getArticle", router.getArticle);
// app.get("/getTagArticle", router.getTagArticle);
// app.get("/findOneArticle", router.findOneArticle);
// app.post("/pointArticle", router.pointArticle); //文章点赞
// //取得总页数
// app.post("/getAllAmount", router.getAllAmount);
// //文章页面
// app.get("/article", router.showArticle);
// //删除文章
// app.post("/delArticle", router.delArticle);

// //显示标签-前台
// app.get("/showTagsFore", router.showTagsFore);
// //显示标签-后台
// app.get("/showTags", router.showTags);
// //添加标签
// app.post("/addTag", router.addTag);
// //删除标签
// app.post("/delTag", router.delTag);

// //注册页面
// app.get("/register", router.showRegister);
// app.post("/doRegister",router.doRegister);

// //登陆页面
// app.get("/login", router.showLogin);
// app.post("/doLogin", router.doLogin);

// //分类文章
// //javascript!
// app.get("/JavaScript",router.showJavaScript);
// app.post("/getJavaScript", router.getJavaScript);
// //javascript

// //NodeJS!
// app.get("/NodeJS",router.showNodeJS);
// app.post("/getNodeJS", router.getNodeJS);
// //NodeJS

// //Environment!
// app.get("/Environment", router.showEnvironment);
// app.post("/getEnvironment", router.getEnvironment);
// //Environment

// //About!
// app.get("/About", router.showAbout);
// //About

// //Comment!
// app.get("/Comment", router.showComment);
// // app.get("/populate", router.populate);
// app.post("/doComment", router.doComment); //保存评论
// app.post("/pointComment", router.pointComment); //评论点赞
// // app.post("/replyComment", router.replyComment); //评论回复
// app.post("/getComment", router.getComment); 
// app.post("/getAllCountComment", router.getAllCountComment);
// //Comment

// //后台页面
// app.get("/manage",router.getManage);

// //访问用户数据！
// app.get("/userdata", router.showUserdata);
// app.post("/getUserdata", router.getUserdata);
// app.post("/countUserdata", router.countUserdata);
// app.post("/delUserdata", router.delUserdata);
// //访问用户数据

// //后台页面!

// //获取用户地理位置
// app.post("/getAddress", router.getAddress);

// //VisitorNum(游览数)
// app.post("/addVisitorNum", router.addVisitorNum);

// //addThumbsUp(点赞数)
// app.post("/addThumbsUp", router.addThumbsUp);

console.log("Server running");





app.listen(3000);
