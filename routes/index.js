var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../db/db.js');



/*格式化时间 */
global.Date.prototype.format = function(pattern) {
    /*初始化返回值字符串*/
    var returnValue = pattern;
    /*正则式pattern类型对象定义*/
    var format = {
        "y+": this.getFullYear(),
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "S": this.getMilliseconds(),
        "h+": (this.getHours() % 12),
        "a": (this.getHours() / 12) <= 1 ? "AM" : "PM"
    };
    /*遍历正则式pattern类型对象构建returnValue对象*/
    for (var key in format) {
        var regExp = new RegExp("(" + key + ")");
        if (regExp.test(returnValue)) {
            var zero = "";
            for (var i = 0; i < RegExp.$1.length; i++) { zero += "0"; }
            var replacement = RegExp.$1.length == 1 ? format[key] : (zero + format[key]).substring((("" + format[key]).length));
            returnValue = returnValue.replace(RegExp.$1, replacement);
        }
    }
    return returnValue;
};


/* 前台首页 */
router.get('/', function(req, res, next) {
    var routepath = req.route.path;
    request(URL + '/api/linklist', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = {
                title: '博客首页',
                routepath: routepath,
                qquser: '',
                data: '',
                link: JSON.parse(body),
            };
            request(URL + '/api/ArticlePage', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var d = JSON.parse(body);
                    data.data = d;
                    if (!req.session.qquser) {
                        data.qquser = { "type": "none" };
                        res.render('index/index.ejs', data);
                    } else {
                        data.qquser = req.session.qquser;
                        res.render('index/index.ejs', data);
                    }
                } else {
                    res.status('404');
                    next();
                }
            })
        } else {
            res.status('404');
            next();
        }
    })
});

/* 前台详情页 */
router.get('/detail/:id', function(req, res, next) {
    var routepath = '/article';
    var id = req.params.id;
    //文章详情查询
    db.Article.findOne({ _id: id }, function(error, doce) {
        if (error) {
            var data = {
                code: "1",
                msg: "查询失败"
            }
        }
        if (doce) {
            var look = parseInt(doce.look) + 1;
            if (look < 10) {
                look = '0' + look;
            }
            //查看量添加
            db.Article.findOneAndUpdate({ _id: id }, { look: look }, function(error, doce) {
                if (error) {
                    var data = {
                        code: "0",
                        msg: "查询失败"
                    }
                } else {
                    var data = {
                        code: "0",
                        msg: "修改成功"
                    }
                }

                //分类查询
                db.Category.find({}, function(error, Categorys) {
                    if (error) {
                        var cat = {
                            code: "1",
                            msg: "查询失败"
                        }
                    } else {
                        var cat = {
                            code: "0",
                            msg: "查询成功",
                            result: Categorys
                        }
                    }
                    //获取回复列表
                    db.MsgList.find({ "Replyid": id }, function(error, MsgLists) {
                        if (error) {
                            var Msg = {
                                code: "1",
                                msg: "获取失败"
                            }
                        } else {
                            var Msg = {
                                code: "0",
                                msg: "获取成功",
                                result: MsgLists
                            }
                        }

                        if (!req.session.qquser) {
                            res.render('index/detail.ejs', { data: doce, 'title': '文章详情', Category: cat, MsgList: Msg, routepath: routepath, qquser: { "type": "none" } });
                        } else {
                            res.render('index/detail.ejs', { data: doce, 'title': '文章详情', Category: cat, MsgList: Msg, routepath: routepath, qquser: req.session.qquser });
                        }

                    })
                })
            })

        } else {
            res.status('404');
            next();
        }

    })
});

/*article */
router.get('/article', function(req, res, next) {
    var routepath = '/article';
    //分类查询
    db.Category.find({}, function(error, Categorys) {
        if (error) {
            var cat = {
                code: "1",
                msg: "查询失败"
            }
        } else {
            var cat = {
                code: "0",
                msg: "查询成功",
                result: Categorys
            }
        }

        if (!req.session.qquser) {
            res.render('index/article.ejs', { 'value': false, Category: cat, 'title': '文章专栏', routepath: routepath, qquser: { "type": "none" } });
        } else {
            res.render('index/article.ejs', { 'value': false, Category: cat, 'title': '文章专栏', routepath: routepath, qquser: req.session.qquser });
        }
    })
});

/*article */
router.get('/article/:id', function(req, res, next) {
    var routepath = '/article';
    //分类查询
    db.Category.find({}, function(error, Categorys) {
        if (error) {
            var cat = {
                code: "1",
                msg: "查询失败"
            }
        } else {
            var cat = {
                code: "0",
                msg: "查询成功",
                result: Categorys
            }
        }

        if (!req.session.qquser) {
            res.render('index/article.ejs', { 'value': req.params.id, Category: cat, 'title': '文章专栏', routepath: routepath, qquser: { "type": "none" } });
        } else {
            res.render('index/article.ejs', { 'value': req.params.id, Category: cat, 'title': '文章专栏', routepath: routepath, qquser: req.session.qquser });
        }
    })
});

/*关于我们 */
router.get('/about', function(req, res, next) {
    var routepath = req.route.path;
    db.GuestBook.find({}, function(error, doce) {
        if (error) {
            var data = {
                code: "1",
                msg: "获取失败"
            }
        } else {
            var data = {
                code: "0",
                msg: "获取成功",
                result: doce
            }
        }
        if (!req.session.qquser) {
            res.render('index/about.ejs', { title: '关于我们', routepath: routepath, qquser: { "type": "none" }, guestbook: data });
        } else {
            res.render('index/about.ejs', { title: '关于我们', routepath: routepath, qquser: req.session.qquser, guestbook: data });
        }
    }).sort({ "AddTimer": -1 })

});

/*时间轴timeline */
router.get('/timeline', function(req, res, next) {
    var routepath = req.route.path;
    if (!req.session.qquser) {
        res.render('index/timeline.ejs', { title: '时间轴', routepath: routepath, qquser: { "type": "none" } });
    } else {
        res.render('index/timeline.ejs', { title: '时间轴', routepath: routepath, qquser: req.session.qquser });
    }
});

/*资源分享 resource */
router.get('/resource', function(req, res, next) {
    var routepath = req.route.path;
    if (!req.session.qquser) {
        res.render('index/resource.ejs', { title: '资源分享', routepath: routepath, qquser: { "type": "none" } });
    } else {
        res.render('index/resource.ejs', { title: '资源分享', routepath: routepath, qquser: req.session.qquser });
    }

});

/*QQ互联登陆get*/
router.get('/User/getuserinfo', function(req, res, next) {
    /**
     * Step1：获取Authorization Code
     */
    res.redirect('https://graph.qq.com/oauth/show?which=Login&display=pc&response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&state=123456')
});

router.get('/User/loginout', function(req, res, next) {
    if (!req.session.qquser) {
        res.redirect(URL);
    } else {
        req.session.qquser = null;
        res.redirect(URL);
    }
});

module.exports = router;