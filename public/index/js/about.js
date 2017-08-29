layui.use(['element', 'jquery', 'form', 'layedit'], function() {
    var element = layui.element();
    var form = layui.form();
    var $ = layui.jquery;
    var layedit = layui.layedit;

    //评论和留言的编辑器的验证
    layui.form().verify({
        content: function(value) {
            value = $.trim(layedit.getText(editIndex));
            if (value == "") return "自少得有一个字吧";
            layedit.sync(editIndex);
        }
    });

    //Hash地址的定位
    var layid = location.hash.replace(/^#tabIndex=/, '');
    if (layid == "") {
        element.tabChange('tabAbout', 1);
    }
    element.tabChange('tabAbout', layid);

    element.on('tab(tabAbout)', function(elem) {
        location.hash = 'tabIndex=' + $(this).attr('lay-id');
    });

    //获取友情链接
    function getFriendLink() {
        $.ajax({
            url: '/api/linklist',
            type: "get",
            dataType: 'json',
            success: function(res) {
                var str = '';
                if (res.code == 0) {
                    for (var i = 0; i < res.result.length; i++) {
                        str += '<li>\
                                  <a target="_blank" href="' + res.result[i].LinkUrl + '" title="Layui" class="friendlink-item">\
                                      <p class="friendlink-item-pic"><img src="' + res.result[i].LinkImg + '" alt="' + res.result[i].LinkName + '" /></p>\
                                      <p class="friendlink-item-title" style="margin-top: 14px;">' + res.result[i].LinkName + '</p>\
                                   </a>\
                              </li>'
                    }
                    $('#friendlink').html(str);
                };
            }
        })
    }
    getFriendLink()

    //监听留言回复提交
    form.on('submit(formReply)', function(data) {
        console.log(data);
        var action = $(data.form).attr('action'),
            data = data.field;
        var indexs = layer.load(1);
        $.ajax({
            url: action,
            type: "post",
            dataType: 'json',
            data: data,
            success: function(res) {
                layer.close(indexs);
                if (res.code == 0) {
                    layer.msg(res.msg, { icon: 1 });
                    setTimeout(function() {
                        window.location.reload();
                    }, 1500)
                } else {
                    layer.msg(res.msg, { shift: 6 });
                };
            }
        })

        //模拟留言回复
        // setTimeout(function() {
        //     layer.close(index);
        //     var content = data.field.replyContent;
        //     var html = '<div class="comment-child"><img src="/index/images/Absolutely.jpg"alt="Absolutely"/><div class="info"><span class="username">模拟回复</span><span>' + content + '</span></div><p class="info"><span class="time">2017-03-18 18:26</span></p></div>';
        //     $(data.form).find('textarea').val('');
        //     $(data.form).parent('.replycontainer').before(html).siblings('.comment-parent').children('p').children('a').click();
        //     layer.msg("回复成功", { icon: 1 });
        // }, 500);
        return false;
    });
});

function btnReplyClick(elem) {
    var $ = layui.jquery;
    $(elem).parent('p').parent('.comment-parent').siblings('.replycontainer').toggleClass('layui-hide');
    if ($(elem).text() == '回复') {
        $(elem).text('收起')
    } else {
        $(elem).text('回复')
    }
}
systemTime();

function systemTime() {
    //获取系统时间。
    var dateTime = new Date();
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hh = dateTime.getHours();
    var mm = dateTime.getMinutes();
    var ss = dateTime.getSeconds();

    //分秒时间是一位数字，在数字前补0。
    mm = extra(mm);
    ss = extra(ss);

    //将时间显示到ID为time的位置，时间格式形如：19:18:02
    document.getElementById("time").innerHTML = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
    //每隔1000ms执行方法systemTime()。
    setTimeout("systemTime()", 1000);
}

//补位函数。
function extra(x) {
    //如果传入数字小于10，数字前补一位0。
    if (x < 10) {
        return "0" + x;
    } else {
        return x;
    }
}