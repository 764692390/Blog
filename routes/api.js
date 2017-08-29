var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../db/db.js');
var Tool = require('../tool/tool.js');
var multiparty = require('multiparty'); /*上传*/
var util = require('util'); /*将对象转换成字符串*/
var fs = require('fs'); /*操作文件 */


/*查询Ip */
router.get('/ip', function(req, res, next) {
    var ip = req.query.ip || Tool.GetClientIp(req);
    request.get('http://ip.taobao.com/service/getIpInfo.php?ip=' + ip, function(error, doce) {
        if (error) {
            res.json({ "code": '1', "msg": "获取IP失败" });
            return false;
        }
        res.json({ "code": '0', "msg": "获取IP成功", result: JSON.parse(doce.body).data });
    });
});


/*注册接口*/
router.post('/reg', function(req, res, next) {
    /*判断用户名*/
    if (!req.body.username) {
        res.send({
            code: "1",
            msg: "用户名不能为空"
        });
        return false;
    }
    /*判断密码*/
    if (!req.body.password) {
        res.send({
            code: "1",
            msg: "密码不能为空"
        });
        return false;
    }


    var reqdata = {
        username: req.body.username,
        addtime: new Date().getTime(),
        password: Tool.Md5(req.body.password),
        userimg: '/images/user.jpg',
        state: '1',
    }
    db.User.findOne({ "username": req.body.username }, function(error, doce) {
        if (error) {
            var data = {
                code: "1",
                msg: "添加用户失败"
            }
            res.send(data);
        } else {
            if (doce) {
                var data = {
                    code: "1",
                    msg: "用户名已存在"
                }
                res.send(data);

            } else {
                new db.User(reqdata).save(function(error) {
                    if (error) {
                        var data = {
                            code: "1",
                            msg: "添加用户失败"
                        }
                    } else {
                        var data = {
                            code: "0",
                            msg: "添加用户成功"
                        }
                    }
                    res.send(data);
                })
            }
        }
    })
});


/*登录接口*/
router.post('/login', function(req, res, next) {
    /*判断用户名*/
    if (!req.body.username) {
        res.send({
            code: "1",
            msg: "用户名不能为空"
        });
        return false;
    };
    /*判断密码*/
    if (!req.body.password) {
        res.send({
            code: "1",
            msg: "密码不能为空"
        });
        return false;
    };
    /* 获取当前ip*/
    var ips = req.query.ip || Tool.GetClientIp(req);
    request.get('http://ip.taobao.com/service/getIpInfo.php?ip=' + ips, function(error, doce) {
        if (error) {
            var ip = { "code": '1', "msg": "获取IP失败" };
        } else {
            var ip = { "code": '0', "msg": "获取IP成功", result: JSON.parse(doce.body).data };
        }
        /*正式登录*/
        db.User.findOne({ 'username': req.body.username }, function(error, doce) {
            if (error) {
                var data = {
                    code: "1",
                    msg: "登陆失败"
                };
                //登录日志
                var LoginLog = {
                    UserName: req.body.username,
                    LoginTimer: new Date().getTime(),
                    ip: ip,
                    LoginState: 'false'
                }
            } else {
                /*判断用户是否存在 */
                if (doce) {
                    /*判断密码是否对 */
                    if (doce.password == Tool.Md5(req.body.password)) {
                        var data = {
                            code: "0",
                            msg: "登陆成功",
                            user: req.body.username
                        }
                        var user = {
                            _id: doce._id,
                            username: doce.username,
                            userimg: doce.userimg
                        }
                        req.session.user = doce.username;
                        //登录日志
                        var LoginLog = {
                            UserName: req.body.username,
                            LoginTimer: new Date().getTime(),
                            ip: ip,
                            LoginState: 'true'
                        }
                    } else {
                        var data = {
                            code: "1",
                            msg: "密码不对"
                        };
                        //登录日志
                        var LoginLog = {
                            UserName: req.body.username,
                            LoginTimer: new Date().getTime(),
                            ip: ip,
                            LoginState: 'false'
                        }
                    }
                } else {
                    /*用户不否存在*/
                    var data = {
                        code: "1",
                        msg: "用户名不存在"
                    };
                    //登录日志
                    var LoginLog = {
                        UserName: req.body.username,
                        LoginTimer: new Date().getTime(),
                        ip: ip,
                        LoginState: 'false'
                    }
                }
            }
            res.send(data);
            //存储登录日志
            db.LoginLog(LoginLog).save(function(error) {});
        })

    });

});

/*文章列表 带分页*/
router.get('/ArticlePage', function(req, res, next) {
    var rows = Math.floor(req.query.rows) || 10;
    var index = Math.floor(req.query.index) || 1;
    var pagesize;
    if (req.query.value) {
        db.Article.count({ categoryvalue: req.query.value }, function(error, doce) {
            pagesize = doce;
        })
        db.Article.find({ categoryvalue: req.query.value }, function(error, doce) {
            if (error) {
                var data = {
                    code: "1",
                    msg: "查询失败"
                }
            } else {
                var n = Math.ceil(pagesize / rows);
                var data = {
                    code: "0",
                    msg: "查询成功",
                    size: pagesize, //总条数
                    pagesize: n, //总共多少页
                    rows: rows, //每页显示多少条
                    index: index, //当前页数
                    result: doce
                }
            }
            res.send(data);
        }).sort({ "stick": -1, "recommend": -1, "addtime": -1 }).skip((index - 1) * rows).limit(rows)

    } else {
        db.Article.count({}, function(error, doce) {
            pagesize = doce;
        })
        db.Article.find({}, function(error, doce) {
            if (error) {
                var data = {
                    code: "1",
                    msg: "查询失败"
                }
            } else {
                var n = Math.ceil(pagesize / rows);
                var data = {
                    code: "0",
                    msg: "查询成功",
                    size: pagesize, //总条数
                    pagesize: n, //总共多少页
                    rows: rows, //每页显示多少条
                    index: index, //当前页数
                    result: doce
                }
            }
            res.send(data);
        }).sort({ "stick": -1, "recommend": -1, "addtime": -1 }).skip((index - 1) * rows).limit(rows)
    }
});


/*发布文章*/
router.post('/saveArticle', function(req, res, next) {

    /*判断用户是否登陆 */
    if (!req.session.user) {
        res.send({
            code: "1",
            msg: "发布失败,请登录"
        });
        return false;
    }
    /*判断标题*/
    if (!req.body.title) {
        res.send({
            code: "1",
            msg: "标题不能为空"
        });
        return false;
    }

    /*判断文章摘要*/
    if (!req.body.abstract) {
        res.send({
            code: "1",
            msg: "文章摘要不能为空"
        });
        return false;
    }
    /*判断类型*/
    if (!req.body.categoryvalue) {
        res.send({
            code: "1",
            msg: "请选择分类"
        });
        return false;
    }
    /*判断内容*/
    if (!req.body.content) {
        res.send({
            code: "1",
            msg: "内容不能为空"
        });
        return false;
    }

    /*判断是否置顶*/
    if (!req.body.stick) {
        var stick = false
    } else {
        var stick = true
    }

    /*判断是否推荐*/
    if (!req.body.recommend) {
        var recommend = false
    } else {
        var recommend = true
    }

    /*判断是否传封面*/
    if (!req.body.coverImg) {
        var coverImg = '/admin/images/cover_default.jpg'
    } else {
        var coverImg = req.body.coverImg
    }


    var reqdata = {
        title: req.body.title, //文章标题
        addtime: new Date().getTime(), //添加时间
        abstract: req.body.abstract, //文章摘要
        content: req.body.content, //文章内容全部
        state: true, //状态
        stick: stick, //置顶
        recommend: recommend, //推荐
        username: req.session.user, //发布者
        categoryvalue: req.body.categoryvalue, //分类id
        categoryname: req.body.categoryname, //分类名称
        coverImg: coverImg, //文章封面
        look: 0, //查看次数
        msgleng: 0, //留言条数
    }
    db.Article(reqdata).save(function(error) {
        if (error) {
            var data = {
                code: "1",
                msg: "发布失败"
            }
        } else {
            var data = {
                code: "0",
                msg: "发布成功"
            }
        }
        res.send(data);
    })
});

/*修改文章 */
router.post('/updateArticle', function(req, res, next) {

    /*判断用户是否登陆 */
    if (!req.session.user) {
        res.send({
            code: "1",
            msg: "发布失败,请登录"
        });
        return false;
    }
    /*判断标题*/
    if (!req.body.title) {
        res.send({
            code: "1",
            msg: "标题不能为空"
        });
        return false;
    }

    /*判断文章摘要*/
    if (!req.body.abstract) {
        res.send({
            code: "1",
            msg: "文章摘要不能为空"
        });
        return false;
    }
    /*判断类型*/
    if (!req.body.categoryvalue) {
        res.send({
            code: "1",
            msg: "请选择分类"
        });
        return false;
    }
    /*判断内容*/
    if (!req.body.content) {
        res.send({
            code: "1",
            msg: "内容不能为空"
        });
        return false;
    }

    /*判断是否置顶*/
    if (!req.body.stick) {
        var stick = false
    } else {
        var stick = true
    }

    /*判断是否推荐*/
    if (!req.body.recommend) {
        var recommend = false
    } else {
        var recommend = true
    }

    /*判断是否传封面*/
    if (!req.body.coverImg) {
        var coverImg = '/admin/Images/cover_default.jpg'
    } else {
        var coverImg = req.body.coverImg
    }
    var reqdata = req.body;
    reqdata.addtime = new Date().getTime();
    reqdata.recommend = recommend;
    reqdata.coverImg = coverImg;
    reqdata.stick = stick;

    db.Article.findOneAndUpdate({ _id: req.body.id }, reqdata, function(error) {
        if (error) {
            var data = {
                code: "1",
                msg: "修改失败"
            }
        } else {
            var data = {
                code: "0",
                msg: "修改成功"
            }
        }
        res.send(data);
    })
});

/*获取文章详情 */
router.get('/getArticle', function(req, res, next) {
    db.Article.findOne({ _id: req.query.id }, function(error, doce) {
        if (error) {
            var data = {
                code: "1",
                msg: "查询失败"
            }
        } else {
            if (doce) {
                var data = {
                    code: "0",
                    msg: "查询成功",
                    result: doce
                }

            } else {
                var data = {
                    code: "1",
                    msg: "没有此id"
                }
            }
        }
        res.json(data);
    })
});

/*删除文章*/
router.post('/removeArticle', function(req, res, next) {
    /*判断用户是否登陆 */
    if (!req.session.user) {
        res.send({
            code: "1",
            msg: "删除失败,请登录"
        });
        return false;
    }

    /*判断类型*/
    if (!req.body.id) {
        res.send({
            code: "1",
            msg: "删除失败，请传入id"
        });
        return false;
    }

    /*判断是否删除所有*/
    if (req.body.type == "all") {
        var str = req.body.id;
        var arr = str.split(',');
        var n = 0;
        for (var i = 0; i < arr.length; i++) {
            var reqdata = {
                _id: arr[i]
            }
            db.Article.remove(reqdata, function(err, docs) {
                if (err) {
                    res.send({
                        code: "1",
                        msg: "删除失败"
                    })
                    return
                }
                console.log('删除成功')
            });
        }

        res.send({
            code: "0",
            msg: "删除成功"
        });

    } else {

        var reqdata = {
            _id: req.body.id
        };

        db.Article.remove(reqdata, function(err, docs) {
            if (err) {
                res.send({
                    code: "1",
                    msg: "删除失败"
                })
                return
            }
            res.send({
                code: "0",
                msg: "删除成功"
            })

        })
    }

});

/*文章分类 category */
router.get('/category', function(req, res, next) {
    db.Category.find({}, function(error, doce) {
        if (error) {
            var data = {
                code: "1",
                msg: "查询失败"
            }
        } else {
            var data = {
                code: "0",
                msg: "查询成功",
                result: doce
            }
        }
        res.json(data);
    })

});

/*上传图片 */
router.post('/file/uploading', function(req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({
        uploadDir: './public/files/',
        /*设置文件保存路径 */
        encoding: 'utf-8',
        /*编码设置 */
        maxFilesSize: 20000 * 1024 * 1024,
        /*设置文件最大值 20MB */
        keepExtensions: true,
        /*保留后缀*/
    });

    //上传处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        function isType(str) {
            if (str.indexOf('.') == -1) {
                return '-1';
            } else {
                var arr = str.split('.');
                return arr.pop();
            }
        }

        if (err) {
            console.log('parse error: ' + err);
        } else {
            var inputFile = files.cover[0];
            var uploadedPath = inputFile.path;
            var type = isType(inputFile.originalFilename);
            /*var dstPath = './public/files/' + inputFile.originalFilename;//真实文件名*/
            var name = new Date().getTime() + '.' + type; /*以上传的时间戳命名*/
            var dstPath = './public/files/' + name

            if (type == "jpg" || type == "png" || type == "exe") {
                //重命名为真实文件名
                fs.rename(uploadedPath, dstPath, function(err) {

                });
                res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                var data = { "code": "0", "msg": "上传成功", "results": [{ "nama": name, "path": "/files/" + name }] };
                res.end(JSON.stringify(data));

            } else {
                fs.unlink(uploadedPath, function(err) {
                    if (err) {
                        return console.error(err);
                    }

                });

                res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                var data = { "code": 1, "msg": "上传失败" };
                res.end(JSON.stringify(data));

            }
        }

    });

});

/*置顶状态修改 stick*/
router.post('/stick', function(req, res, next) {

    /*判断用户是否登陆 */
    if (!req.session.user) {
        res.send({
            code: "1",
            msg: "请登录"
        });
        return false;
    }

    /*判断id*/
    if (!req.body.id) {
        res.send({
            code: "1",
            msg: "id错误"
        });
        return false;
    }

    /*判断状态*/
    if (!req.body.stick) {
        res.send({
            code: "1",
            msg: "状态错误"
        });
        return false;
    }

    db.Article.findOneAndUpdate({ _id: req.body.id }, { stick: req.body.stick }, function(error, doc) {
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
        res.send(data);
    })

});

/*推荐状态修改 recommend*/
router.post('/recommend', function(req, res, next) {

    /*判断用户是否登陆 */
    if (!req.session.user) {
        res.send({
            code: "1",
            msg: "请登录"
        });
        return false;
    }

    /*判断id*/
    if (!req.body.id) {
        res.send({
            code: "1",
            msg: "id错误"
        });
        return false;
    }

    /*判断状态*/
    if (!req.body.recommend) {
        res.send({
            code: "1",
            msg: "状态错误"
        });
        return false;
    }

    db.Article.findOneAndUpdate({ _id: req.body.id }, { recommend: req.body.recommend }, function(error, doc) {
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
        res.send(data);
    })

});

/*热文排行榜 hotarticles*/
router.get('/hotarticles', function(req, res, next) {
    db.Article.find({}, function(error, doce) {
        if (error) {
            var data = {
                code: "1",
                msg: "查询失败"
            }
        } else {
            var arr = [];
            if (doce.length) {
                if (doce.length > 8) {
                    for (var i = 0; i < 8; i++) {
                        doce[i].abstract = '';
                        doce[i].content = '';
                        arr.push(doce[i]);
                    }
                } else {
                    for (var i = 0; i < doce.length; i++) {
                        doce[i].abstract = '';
                        doce[i].content = '';
                        arr.push(doce[i]);
                    }
                }

                var data = {
                    code: "0",
                    msg: "查询成功",
                    size: 8, //总条数
                    result: arr
                }
            } else {
                var data = {
                    code: "0",
                    msg: "查询失败",
                    size: 8, //总条数
                    result: arr
                }
            }
        }
        res.send(data);
    }).sort({ "look": -1 })

});

/*回复消息*/
router.post('/sendmsg', function(req, res, next) {
    /*判断用户是否登陆 */
    // req.session.qquser = {
    //     "ret": "0",
    //     "msg": "",
    //     "is_lost": "0",
    //     "nickname": "謓dêシ累了",
    //     "gender": "男",
    //     "province": "北京",
    //     "city": "朝阳",
    //     "year": "1990",
    //     "figureurl": "http://qzapp.qlogo.cn/qzapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/30",
    //     "figureurl_1": "http://qzapp.qlogo.cn/qzapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/50",
    //     "figureurl_2": "http://qzapp.qlogo.cn/qzapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/100",
    //     "figureurl_qq_1": "http://q.qlogo.cn/qqapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/40",
    //     "figureurl_qq_2": "http://q.qlogo.cn/qqapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/100",
    //     "is_yellow_vip": "0",
    //     "vip": "0",
    //     "yellow_vip_level": "0",
    //     "level": "0",
    //     "is_yellow_year_vip": "0",
    //     "openid": "A05A81F6D207BA1CEA273FF985A5628D",
    //     "addtimer": "1494402141408",
    //     "__v": 0,
    //     "updatatimer": "1496834877032",
    //     "speak": "31"
    // }

    if (!req.session.qquser) {
        res.json({
            code: "1",
            msg: "请登录后评论"
        });
        return false;
    }
    if (!req.body.Replyid) {
        res.json({
            code: "1",
            msg: "Replyid获取失败"
        });
        return false;
    }
    if (!req.body.ReplyTitle) {
        res.json({
            code: "1",
            msg: "ReplyTitle获取失败"
        });
        return false;
    } else {
        var str = req.body.ReplyTitle;
        if (str.indexOf('ฐ้้้้้้้้้้้้้้้้้้้้้้้้้้้') != -1) {
            res.json({
                code: "1",
                msg: "不要输入非法字符！"
            });
            return false;
        }
    }
    if (!req.body.ReplyConten) {
        res.json({
            code: "1",
            msg: "ReplyConten获取失败"
        });
        return false;
    } else {
        var str = req.body.ReplyConten;
        if (str.indexOf('ฐ้้้้้้้้้้้้้้้้้้้้้้้้้้้') != -1) {
            res.json({
                code: "1",
                msg: "不要输入非法字符！"
            });
            return false;
        } else {
            //XSS防注入
            req.body.ReplyConten = Tool.StrToHtml.content(str);
        }
    }

    var reqdata = {
        Replyid: req.body.Replyid, //帖子id
        ReplyTitle: req.body.ReplyTitle, //帖子标题
        ReplyConten: req.body.ReplyConten, //回复内容
        AddTimer: new Date().getTime(), //回复时间
        UserName: req.session.qquser.nickname, //用户名称
        UserImg: req.session.qquser.figureurl_2, //用户头像
        ReplyChild: []
    };
    var reqHotComment = {
        Replyid: req.body.Replyid, //帖子id
        ReplyTitle: req.body.ReplyTitle, //帖子标题
        ReplyConten: req.body.ReplyConten, //回复内容
        AddTimer: new Date().getTime(), //回复时间
        UserName: req.session.qquser.nickname, //用户名称
        UserImg: req.session.qquser.figureurl_2, //用户头像
    };
    //修改回复条数
    db.Article.findOne({ _id: req.body.Replyid }, function(error, doce) {
        var n = (doce.msgleng) * 1 + 1;
        db.Article.findOneAndUpdate({ _id: req.body.Replyid }, { msgleng: n }, function(error) {
            if (error) {
                var data = {
                    code: "1",
                    msg: "修改失败"
                }
            } else {
                var data = {
                    code: "0",
                    msg: "修改成功"
                }
            }
        })
    });

    //修改回复条数 QQ用户Userqq-热评用户
    db.Userqq.findOne({ openid: req.session.qquser.openid }, function(error, doce) {
        var n = (doce.speak) * 1 + 1;
        //小于10补零 解决排序bug
        if (n < 10) {
            n = '0' + n;
        }
        db.Userqq.findOneAndUpdate({ openid: req.session.qquser.openid }, { speak: n }, function(error) {
            if (error) {
                var data = {
                    code: "1",
                    msg: "修改失败"
                }
            } else {
                var data = {
                    code: "0",
                    msg: "修改成功"
                }
            }
        })
    });
    request.get("http://blog.jczxw.cn/api/ip?ip=" + Tool.GetClientIp(req), function(error, doce) {
        var ip = JSON.parse(doce.body);
        reqHotComment.ip = ip.result;
        //热评评论
        db.HotComment.findOne({ Replyid: req.body.Replyid }, function(error, doce) {
            if (doce === null) {
                db.HotComment(reqHotComment).save(function(error) {
                    if (error) {
                        var data = {
                            code: "1",
                            msg: "发布失败"
                        }
                    } else {
                        var data = {
                            code: "0",
                            msg: "发布成功"
                        }
                    }
                })
            } else {
                db.HotComment.findOneAndUpdate({ Replyid: req.body.Replyid }, { ReplyConten: req.body.ReplyConten, AddTimer: new Date().getTime(), UserName: req.session.qquser.nickname, UserImg: req.session.qquser.figureurl_2, ip: ip.result }, function(error) {
                    if (error) {
                        var data = {
                            code: "1",
                            msg: "修改失败"
                        }
                    } else {
                        var data = {
                            code: "0",
                            msg: "修改成功"
                        }
                    }
                })
            }
        });

        reqdata.ip = ip.result;
        db.MsgList(reqdata).save(function(error) {
            if (error) {
                var data = {
                    code: "1",
                    msg: "发布失败"
                }
            } else {
                var data = {
                    code: "0",
                    msg: "发布成功"
                }
            }
            res.json(data);
        })
    });
})

/*热评评论*/
router.get('/gethot', function(req, res, next) {
    var rows = Math.floor(req.query.rows) || 10;
    var index = Math.floor(req.query.index) || 1;
    var pagesize;
    db.HotComment.count({ categoryvalue: req.query.value }, function(error, doce) {
        pagesize = doce;
    });
    db.HotComment.find({}, function(error, doce) {
        if (error) {
            var data = {
                code: "1",
                msg: "获取失败"
            }
        } else {
            var data = {
                code: "0",
                rows: rows,
                index: index,
                pagesize: pagesize,
                msg: "获取成功",
                result: doce
            }
        }
        res.json(data);
    }).sort({ "AddTimer": -1 }).skip((index - 1) * rows).limit(rows);
});


/*热评用户*/
router.get('/getqqhot', function(req, res, next) {
    var rows = Math.floor(req.query.rows) || 10;
    var index = Math.floor(req.query.index) || 1;
    var pagesize;
    db.Userqq.count({ categoryvalue: req.query.value }, function(error, doce) {
        pagesize = doce;
    });
    db.Userqq.find({}, function(error, doce) {
        if (error) {
            var data = {
                code: "1",
                msg: "获取失败"
            }
        } else {
            var data = {
                code: "0",
                msg: "获取成功",
                rows: rows,
                index: index,
                pagesize: pagesize,
                result: doce
            }
        }
        res.json(data);
    }).sort({ "speak": -1 }).skip((index - 1) * rows).limit(rows);
});


/*留言墙 一级*/
router.post('/guestbook', function(req, res, next) {
    /*判断用户是否登陆 */
    // req.session.qquser = {
    //     "ret": "0",
    //     "msg": "",
    //     "is_lost": "0",
    //     "nickname": "謓dêシ累了",
    //     "gender": "男",
    //     "province": "北京",
    //     "city": "朝阳",
    //     "year": "1990",
    //     "figureurl": "http://qzapp.qlogo.cn/qzapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/30",
    //     "figureurl_1": "http://qzapp.qlogo.cn/qzapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/50",
    //     "figureurl_2": "http://qzapp.qlogo.cn/qzapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/100",
    //     "figureurl_qq_1": "http://q.qlogo.cn/qqapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/40",
    //     "figureurl_qq_2": "http://q.qlogo.cn/qqapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/100",
    //     "is_yellow_vip": "0",
    //     "vip": "0",
    //     "yellow_vip_level": "0",
    //     "level": "0",
    //     "is_yellow_year_vip": "0",
    //     "openid": "A05A81F6D207BA1CEA273FF985A5628D",
    //     "addtimer": "1494402141408",
    //     "__v": 0,
    //     "updatatimer": "1496834877032",
    //     "speak": "31"
    // }

    if (!req.session.qquser) {
        res.json({
            code: "1",
            msg: "请登录后评论"
        });
        return false;
    }

    if (!req.body.ReplyConten) {
        res.json({
            code: "1",
            msg: "ReplyConten获取失败"
        });
        return false;
    } else {
        var str = req.body.ReplyConten;
        if (str.indexOf('ฐ้้้้้้้้้้้้้้้้้้้้้้้้้้้') != -1) {
            res.json({
                code: "1",
                msg: "不要输入非法字符！"
            });
            return false;
        } else {
            //XSS防注入
            req.body.ReplyConten = Tool.StrToHtml.content(str);
        }
    }

    var reqdata = {
        ReplyConten: req.body.ReplyConten, //回复内容
        AddTimer: new Date().getTime(), //回复时间
        UserName: req.session.qquser.nickname, //用户名称
        UserImg: req.session.qquser.figureurl_2, //用户头像
        ReplyChild: [],
    };

    request.get("http://blog.jczxw.cn/api/ip?ip=" + Tool.GetClientIp(req), function(error, doce) {
        var ip = JSON.parse(doce.body);
        reqdata.ip = ip.result;
        db.GuestBook(reqdata).save(function(error) {
            if (error) {
                var data = {
                    code: "1",
                    msg: "发布失败"
                }
            } else {
                var data = {
                    code: "0",
                    msg: "发布成功"
                }
            }
            res.json(data);
        })
    })
})

/*留言墙 二级*/
router.post('/guestbookchild', function(req, res, next) {
    /*判断用户是否登陆 */
    // req.session.qquser = {
    //     "ret": "0",
    //     "msg": "",
    //     "is_lost": "0",
    //     "nickname": "謓dêシ累了",
    //     "gender": "男",
    //     "province": "北京",
    //     "city": "朝阳",
    //     "year": "1990",
    //     "figureurl": "http://qzapp.qlogo.cn/qzapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/30",
    //     "figureurl_1": "http://qzapp.qlogo.cn/qzapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/50",
    //     "figureurl_2": "http://qzapp.qlogo.cn/qzapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/100",
    //     "figureurl_qq_1": "http://q.qlogo.cn/qqapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/40",
    //     "figureurl_qq_2": "http://q.qlogo.cn/qqapp/101400146/A05A81F6D207BA1CEA273FF985A5628D/100",
    //     "is_yellow_vip": "0",
    //     "vip": "0",
    //     "yellow_vip_level": "0",
    //     "level": "0",
    //     "is_yellow_year_vip": "0",
    //     "openid": "A05A81F6D207BA1CEA273FF985A5628D",
    //     "addtimer": "1494402141408",
    //     "__v": 0,
    //     "updatatimer": "1496834877032",
    //     "speak": "31"
    // }

    if (!req.session.qquser) {
        res.json({
            code: "1",
            msg: "请登录后评论"
        });
        return false;
    }

    if (!req.body._id) {
        res.json({
            code: "1",
            msg: "_id获取失败!"
        });
        return false;
    } else {
        var _id = req.body._id;
    }

    if (!req.body.ChildReplyConten) {
        res.json({
            code: "1",
            msg: "ReplyConten获取失败"
        });
        return false;
    } else {
        var str = req.body.ChildReplyConten;
        if (str.indexOf('ฐ้้้้้้้้้้้้้้้้้้้้้้้้้้้') != -1) {
            res.json({
                code: "1",
                msg: "不要输入非法字符！"
            });
            return false;
        } else {
            //XSS防注入
            req.body.ChildReplyConten = Tool.StrToHtml.content(str);
        }
    }

    var reqdata = {
        ChildReplyConten: req.body.ChildReplyConten, //回复内容
        ChildAddTimer: new Date().getTime(), //回复时间
        ChildUserName: req.session.qquser.nickname, //用户名称
        ChildUserImg: req.session.qquser.figureurl_2, //用户头像
    };

    request.get("http://blog.jczxw.cn/api/ip?ip=" + Tool.GetClientIp(req), function(error, doce) {
        var ip = JSON.parse(doce.body);
        reqdata.ip = ip.result;
        db.GuestBook.update({ _id: _id }, { "$push": { "ReplyChild": reqdata } }, function(error, doce) {
            if (error) {
                var data = {
                    code: "1",
                    msg: "发布失败"
                }
            } else {
                var data = {
                    code: "0",
                    msg: "发布成功"
                }
            }
            res.json(data);
        });
    })
})

/*获取留言墙*/
router.get('/getguestbook', function(req, res, next) {
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
        res.json(data);
    }).sort({ "AddTimer": -1 })
})

/*添加用户adddata 列表 */
router.post('/adddata', function(req, res, next) {
    db.UserList(req.body).save(function(error) {
        if (error) {
            var data = {
                code: "1",
                msg: "发布失败"
            }
        } else {
            var data = {
                code: "0",
                msg: "发布成功"
            }
        }
        res.send(data);
    })
})


/*QQ回调域  User/QQLoginCallBack*/
router.get('/User/QQLoginCallBack', function(req, res, next) {
    var code = req.query.code;
    var state = req.query.state;
    /**
     * Step2：通过Authorization Code获取Access Token
     */
    if (code) {
        request('https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&code=' + code + '&client_secret=' + client_secret, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var arr = body.split('&');
                var json = {};
                json.access_token = arr[0].split('=')[1];
                json.expires_in = arr[1].split('=')[1];
                json.refresh_token = arr[2].split('=')[1];
                request('https://graph.qq.com/oauth2.0/me?access_token=' + json.access_token, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var L = body.indexOf('{');
                        var R = body.indexOf('}');
                        var openidstr = body.substring(L, R).split(',')[1].split(':')[1];
                        var openid = openidstr.substring(1, openidstr.length - 1);
                        request('https://graph.qq.com/user/get_user_info?access_token=' + json.access_token + '&openid=' + openid + '&oauth_consumer_key=' + client_id, function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var qquser = JSON.parse(body);
                                qquser.openid = openid;
                                qquser.type = "block";
                                req.session.qquser = qquser;
                                db.Userqq.findOne({ 'openid': openid }, function(error, doce) {
                                    if (doce) {
                                        qquser.updatatimer = new Date().getTime();
                                        db.Userqq.update({ 'openid': openid }, qquser, function(error, doce) {
                                            if (error) {
                                                console.log('更新失败');
                                            } else {
                                                console.log('更新成功');
                                            }
                                            res.redirect(URL);
                                        })
                                    } else {
                                        qquser.addtimer = new Date().getTime();
                                        qquser.speak = 0;
                                        db.Userqq(qquser).save(function(error, doce) {
                                            if (error) {
                                                console.log('保存失败');
                                            } else {
                                                console.log('保存成功');
                                            }
                                            res.redirect(URL);
                                        })
                                    }
                                })

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

            } else {
                res.status('404');
                next();
            }
        })

    } else {
        res.redirect(URL);
    }

});

//日志
router.get('/log', function(req, res, next) {
    //跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')

    var useragent = JSON.stringify(req.headers);
    var newdata = {
        ip: {}, //访客ip信息
        qquser: null, //用户登录信息，
        useragent: useragent, //浏览器信息
        referer: '', //当前访问页面
        timer: new Date().getTime(), //当前访问时间
    }

    //获取用户登录信息
    if (req.session.qquser) {
        newdata.qquser = req.session.qquser;
    };

    //获取当前访问页面
    if (req.query.referer) {
        newdata.referer = req.query.referer;
    };

    //获取ip
    var ip = req.query.ip || Tool.GetClientIp(req);
    var ips = '';
    request.get('http://ip.taobao.com/service/getIpInfo.php?ip=' + ip, function(error, doce) {
        if (error) {
            ips = { "code": '1', "msg": "获取IP失败" };
        } else {
            ips = { "code": '0', "msg": "获取IP成功", result: JSON.parse(doce.body).data };
        }
        newdata.ip = ips;
        //存储数据库
        db.Log(newdata).save(function(error) {
            if (error) {
                var data = {
                    code: "1",
                    msg: "保存log失败"
                }
            } else {
                var data = {
                    code: "0",
                    msg: "保存log成功"
                }
            }
            res.json(data);
        })
    });
})

//后台统计接口
router.get('/adminlistlog', function(req, res, next) {
    /*判断用户是否登陆 */
    if (!req.session.user) {
        res.send({
            code: "1",
            msg: "获取失败,请登录"
        });
        return false;
    };
    //查询
    var Userqq = '0'; //qq用户列表总数
    db.Userqq.count({}, function(error, doce) {
        Userqq = doce;

        var User = '0'; //管理员列表总数
        db.User.count({}, function(error, doce) {
            User = doce;

            var Article = '0'; //文章列表总数
            db.Article.count({}, function(error, doce) {
                Article = doce;

                var Category = '0'; //分类列表总数
                db.Category.count({}, function(error, doce) {
                    Category = doce;

                    var MsgList = '0'; //评论列表总数
                    db.MsgList.count({}, function(error, doce) {
                        MsgList = doce;

                        var Link = '0'; //友连列表总数
                        db.Link.count({}, function(error, doce) {
                            Link = doce;

                            var data = {
                                    code: '0',
                                    msg: '获取数据成功',
                                    result: {
                                        Userqq: Userqq,
                                        User: User,
                                        Article: Article,
                                        Category: Category,
                                        MsgList: MsgList,
                                        Link: Link,
                                        LoginLog: '',
                                    }
                                }
                                //查询当前登录用户的 登录日志；
                            db.LoginLog.find({ "UserName": req.session.user }, function(error, doce) {

                                //第一次登录
                                if (doce.length == 0) {
                                    db.LoginLog.find({ "UserName": req.session.user }, function(error, doce) {
                                        data.result.LoginLog = doce[0];
                                        res.json(data);
                                    });
                                } else {
                                    data.result.LoginLog = doce[0];
                                    res.json(data);
                                }
                            }).sort({ "LoginTimer": '-1' }).skip(1).limit(1)
                        });

                    });

                });

            });

        });

    });
})

//获取友情链接列表
router.get('/linklist', function(req, res, next) {
    db.Link.find({}, function(error, doce) {
        if (error) {
            var data = {
                code: "1",
                msg: "查询失败"
            }
        } else {
            var data = {
                code: "0",
                msg: "查询成功",
                result: doce
            }
        }
        res.json(data);
    })
})

//添加链接
router.post('/addlinklist', function(req, res, next) {
    /*判断用户是否登陆 */
    if (!req.session.user) {
        res.send({
            code: "1",
            msg: "操作失败，请登录!"
        });
        return false;
    };

    if (!req.body.LinkUrl) {
        res.send({
            code: "1",
            msg: "LinkUrl 不能为空"
        });
        return false;
    }

    if (!req.body.LinkName) {
        res.send({
            code: "1",
            msg: "LinkName不能为空"
        });
        return false;
    }

    if (!req.body.LinkImg) {
        res.send({
            code: "1",
            msg: "LinkImg不能为空"
        });
        return false;
    }

    var data = {
        LinkUrl: req.body.LinkUrl,
        LinkName: req.body.LinkName,
        LinkImg: req.body.LinkImg,
        LinkTimer: new Date().getTime(),
        AddUser: req.session.user,
        LinkState: true
    };

    db.Link(data).save(function(error) {
        if (error) {
            var data = {
                code: "1",
                msg: "添加失败"
            }
        } else {
            var data = {
                code: "0",
                msg: "添加成功",
            }
        }
        res.json(data);
    })
})

module.exports = router;