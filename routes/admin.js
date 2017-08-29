var express = require('express');
var router = express.Router();
var db = require('../db/db.js');

/* /admin判断是否登录 */
router.get('/', function(req, res, next) {
    /*判断用户是否登陆 */
    if (!req.session.user) {
        /*没登录重定向登录页面*/
        res.redirect('/admin/login');
    } else {
        /*已登录*/
        res.redirect('/admin/main');

    }
});
/* /admin/login 登录页面 */
router.get('/login', function(req, res, next) {

    res.render('admin/login.ejs', { title: '登录' });
});

/* /admin/main 首页 */
router.get('/main', function(req, res, next) {
    /*判断用户是否登陆 */
    if (!req.session.user) {
        /*没登录重定向登录页面*/
        res.redirect('/admin/login');
    } else {
        /*已登录*/
        res.render('admin/main.ejs', { 'title': '后台首页' });
    }
});

/* /admin/logout 退出登录 */
router.get('/logout', function(req, res, next) {
    req.session.user = '';
    /*没登录重定向登录页面*/
    res.redirect('/admin/login');
});

/* /admin/datalist  文章列表*/
router.post('/datalist', function(req, res, next) {
    /*判断用户是否登陆 */
    if (!req.session.user) {
        /*没登录重定向登录页面*/
        res.redirect('/admin/login');
    } else {
        /*已登录*/
        res.render('admin/common/datalist.ejs', { title: '数据列表页面' });

    }
});

/* /admin/datalist  添加文章*/
router.post('/addArticle/:id', function(req, res, next) {
    /*判断用户是否登陆 */
    if (!req.session.user) {
        /*没登录重定向登录页面*/
        res.redirect('/admin/login');
    } else {
        /*已登录*/
        var id = req.params.id;
        if (id == "add") {
            /*添加文章*/
            res.render('admin/common/addArticle.ejs', { title: '添加文章' });
        } else {
            db.article.findOne({ '_id': id }, function(erroe, doc) {
                if (error) {
                    res.redirect('/404');
                    return false;
                }
                /*修改文章*/
                res.render('admin/common/addArticle.ejs', { title: '修改文章', data: doc });
            })

        }
    }
});

/* /admin/category 分类管理 */
router.post('/category', function(req, res, next) {
    /*判断用户是否登陆 */
    if (!req.session.user) {
        /*没登录重定向登录页面*/
        res.redirect('/admin/login');
    } else {
        /*已登录*/
        res.render('admin/common/category.ejs', { title: '数据列表页面' });

    }
});


/* /admin/link 友链 */
router.post('/link', function(req, res, next) {
    /*判断用户是否登陆 */
    if (!req.session.user) {
        /*没登录重定向登录页面*/
        res.redirect('/admin/login');
    } else {
        /*已登录*/
        res.render('admin/common/link.ejs', { title: '友情链接' });
    }
});

module.exports = router;