﻿layui.define(['element', 'layer', 'util', 'pagesize', 'form'], function(exports) {
    var $ = layui.jquery;
    var element = layui.element();
    var layer = layui.layer;
    var util = layui.util;
    var form = layui.form();
    //form.render();
    //快捷菜单开关
    $('span.sys-title').click(function(e) {
        e.stopPropagation(); //阻止事件冒泡
        $('div.short-menu').slideToggle('fast');
    });
    $('div.short-menu').click(function(e) {
        e.stopPropagation(); //阻止事件冒泡
    });
    $(document).click(function() {
        $('div.short-menu').slideUp('fast');
        $('.individuation').removeClass('bounceInRight').addClass('flipOutY');
    });
    //个性化设置开关
    $('#individuation').click(function(e) {
        e.stopPropagation(); //阻止事件冒泡
        $('.individuation').removeClass('layui-hide').toggleClass('bounceInRight').toggleClass('flipOutY');
    });
    $('.individuation').click(function(e) {
        e.stopPropagation(); //阻止事件冒泡
    })
    $('.layui-body').click(function() {
        $('.individuation').removeClass('bounceInRight').addClass('flipOutY');
    });

    //获取系统统计信息
    function adminlistlog() {
        $.ajax({
            url: '/api/adminlistlog',
            type: 'get',
            success: function(msg) {
                if (msg.code == 0) {
                    $('.User').html(msg.result.User);
                    $('.Userqq').html(msg.result.Userqq);
                    $('.Article').html(msg.result.Article);
                    $('.Category').html(msg.result.Category);
                    $('.MsgList').html(msg.result.MsgList);
                    $('.Link').html(msg.result.Link);
                    $('#LoginLog').html(' 上次登陆\
                            <span style="padding-left:1em;">IP：' + msg.result.LoginLog.ip.result.ip + '</span>\
                            <span style="padding-left:1em;">地点：' + msg.result.LoginLog.ip.result.city + '</span>\
                            <span style="padding-left:1em;">时间：' + new Date(parseInt(msg.result.LoginLog.LoginTimer)).format("yyyy-MM-dd HH:mm:ss") + '</span>');
                }
            }
        })
    };
    adminlistlog();

    //监听左侧导航点击
    element.on('nav(leftnav)', function(elem) {
        var url = $(elem).children('a').attr('data-url'); //页面url
        var id = $(elem).children('a').attr('data-id'); //tab唯一Id
        var title = $(elem).children('a').text(); //菜单名称
        if (title == "首页") {
            element.tabChange('tab', 0);
            return;
        }
        if (url == undefined) return;

        var tabTitleDiv = $('.layui-tab[lay-filter=\'tab\']').children('.layui-tab-title');
        var exist = tabTitleDiv.find('li[lay-id=' + id + ']');
        if (exist.length > 0) {
            //切换到指定索引的卡片
            element.tabChange('tab', id);
        } else {
            var index = layer.load(1);
            $.ajax({
                type: 'post',
                url: url,
                success: function(data) {
                    layer.close(index);
                    element.tabAdd('tab', { title: title, content: data, id: id });
                    //切换到指定索引的卡片
                    element.tabChange('tab', id);
                },
                error: function(e) {
                    var message = e.responseText;
                    layer.close(index);
                    layer.msg(message, { icon: 2 });
                }
            });
        }
    });

    //监听侧边导航开关
    form.on('switch(sidenav)', function(data) {
        if (data.elem.checked) {
            showSideNav();
            layer.msg('这个开关是layui的开关改编的');
        } else {
            hideSideNav();
        }
    });

    //收起侧边导航点击事件
    $('.layui-side-hide').click(function() {
        hideSideNav();
        $('input[lay-filter=sidenav]').siblings('.layui-form-switch').removeClass('layui-form-onswitch');
        $('input[lay-filter=sidenav]').prop("checked", false);
    });

    //鼠标靠左展开侧边导航
    $(document).mousemove(function(e) {
        if (e.pageX == 0) {
            showSideNav();
            $('input[lay-filter=sidenav]').siblings('.layui-form-switch').addClass('layui-form-onswitch');
            $('input[lay-filter=sidenav]').prop("checked", true);
        }
    });

    //皮肤切换
    $('.skin').click(function() {
        var skin = $(this).attr("data-skin");
        $('body').removeClass();
        $('body').addClass(skin);
    });

    var ishide = false;
    //隐藏侧边导航
    function hideSideNav() {
        if (!ishide) {
            $('.layui-side').animate({ left: '-200px' });
            $('.layui-side-hide').animate({ left: '-200px' });
            $('.layui-body').animate({ left: '0px' });
            $('.layui-footer').animate({ left: '0px' });
            var tishi = layer.msg('鼠标靠左自动显示菜单', { time: 1500 });
            layer.style(tishi, {
                top: 'auto',
                bottom: '50px'
            });
            ishide = true;
        }
    }
    //显示侧边导航
    function showSideNav() {
        if (ishide) {
            $('.layui-side').animate({ left: '0px' });
            $('.layui-side-hide').animate({ left: '0px' });
            $('.layui-body').animate({ left: '200px' });
            $('.layui-footer').animate({ left: '200px' });
            ishide = false;
        }
    }


    //runSteward();
    //管家功能
    function runSteward() {
        var layerSteward; //管家窗口
        var isStop = false; //是否停止提醒

        getNotReplyLeaveMessage();

        var interval = setInterval(function() {
            getNotReplyLeaveMessage();
        }, 60000); //1分钟提醒一次

        function getNotReplyLeaveMessage() {
            clearInterval(interval); //停止计时器
            var content = '<p>目前有<span>12</span>条留言未回复<a href="javascript:layer.msg(\'跳转到相应页面\')">点击查看</a></p>';
            content += '<div class="notnotice" >不再提醒</div>';
            layerSteward = layer.open({
                type: 1,
                title: '管家提醒',
                shade: 0,
                resize: false,
                area: ['340px', '215px'],
                time: 10000, //10秒后自动关闭
                skin: 'steward',
                closeBtn: 1,
                anim: 2,
                content: content,
                end: function() {
                    if (!isStop) {
                        interval = setInterval(function() {
                            if (!isStop) {
                                clearInterval(interval);
                                getNotReplyLeaveMessage();
                            }
                        }, 60000);
                    }
                }
            });
            $('.steward').click(function(e) {
                event.stopPropagation(); //阻止事件冒泡
            });
            $('.notnotice').click(function() {
                isStop = true;
                layer.close(layerSteward);
                $('input[lay-filter=steward]').siblings('.layui-form-switch').removeClass('layui-form-onswitch');
                $('input[lay-filter=steward]').prop("checked", false);
            });
            form.on('switch(steward)', function(data) {
                if (data.elem.checked) {
                    isStop = false;
                    clearInterval(interval);
                    runSteward();
                } else {
                    isStop = true;
                    layer.close(layerSteward);
                }
            })
        }
    }

    //时间格式化
    Date.prototype.format = function(pattern) {
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



    exports('main', {});
});