layui.use(['form', 'upload', 'layer', 'laypage', 'pagesize', 'laydate'], function() {
    var form = layui.form();
    var $ = layui.jquery;
    var layer = layui.layer;
    var laypage = layui.laypage;
    var laydate = layui.laydate;
    var laypageId = 'pageNav';
    //页数据初始化
    //currentIndex：当前也下标
    //pageSize：页容量（每页显示的条数）
    function initilData(currentIndex, pageSize) {
        var index = layer.load(1);
        $.ajax({
            type: 'get',
            url: '/api/ArticlePage',
            dataType: "json",
            data: {
                rows: pageSize,
                index: currentIndex
            },
            success: function(msg) {
                if (msg.code != 0) {
                    layer.msg(msg.msg, { icon: 2 });
                    return false;
                }

                var data = msg.result;
                var html = ''; //由于静态页面，所以只能作字符串拼接，实际使用一般是ajax请求服务器数据
                html += '<table style="" class="layui-table" lay-even>';
                html += '<colgroup><col width="180"><col><col width="150"><col width="180"><col width="90"><col width="90"><col width="50"><col width="50"></colgroup>';
                html += '<thead><tr><th>发表时间</th><th>标题</th><th>作者</th><th>类别</th><th colspan="2">选项</th><th colspan="2">操作</th></tr></thead>';
                html += '<tbody>';
                //遍历文章集合
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html += "<tr>";
                    html += "<td>" + new Date(parseInt(item.addtime)).format("yyyy-MM-dd HH:mm:ss") + "</td>";
                    html += "<td>" + item.title + "</td>";
                    html += "<td>" + item.username + "</td>";
                    html += "<td>" + item.categoryname + "</td>";
                    if (item.stick) {
                        html += '<td><form class="layui-form" action=""><div class="layui-form-item" style="margin:0;"><input type="checkbox" name="stick" title="置顶" value="' + item._id + '" lay-filter="stick" checked /></div></form></td>';
                    } else {
                        html += '<td><form class="layui-form" action=""><div class="layui-form-item" style="margin:0;"><input type="checkbox" name="stick" title="置顶" value="' + item._id + '" lay-filter="stick" /></div></form></td>';
                    }
                    if (item.recommend) {
                        html += '<td><form class="layui-form" action=""><div class="layui-form-item" style="margin:0;"><input type="checkbox" name="recommend" title="推荐" value="' + item._id + '" lay-filter="recommend" checked /></div></form></td>';
                    } else {
                        html += '<td><form class="layui-form" action=""><div class="layui-form-item" style="margin:0;"><input type="checkbox" name="recommend" title="推荐" value="' + item._id + '" lay-filter="recommend"  /></div></form></td>';
                    }
                    html += '<td><button class="layui-btn layui-btn-small layui-btn-normal" onclick="layui.datalist.editData(\'' + item._id + '\')"><i class="layui-icon">&#xe642;</i></button></td>';
                    html += '<td><button class="layui-btn layui-btn-small layui-btn-danger" onclick="layui.datalist.deleteData(\'' + item._id + '\')"><i class="layui-icon">&#xe640;</i></button></td>';
                    html += "</tr>";
                }
                html += '</tbody>';
                html += '</table>';
                html += '<div id="' + laypageId + '"></div>';

                $('#dataContent').html(html);
                layer.close(index);
                form.render(); //重新渲染CheckBox，编辑和添加的时候
                $('#dataConsole,#dataList').attr('style', 'display:block'); //显示FiledBox
                var pages = msg.pagesize;
                laypage({
                    cont: laypageId,
                    pages: pages,
                    groups: msg.rows,
                    skip: true,
                    curr: currentIndex,
                    jump: function(obj, first) {
                        var currentIndex = obj.curr;
                        if (!first) {
                            initilData(currentIndex, pageSize);
                        }
                    }
                });
            },
            error: function(e) {
                var message = e.responseText;
                layer.msg(message, { icon: 2 });
            }
        });

    }

    //图片上传
    var index;
    layui.upload({
        url: '/api/file/uploading',
        elem: '#articleCoverInput',
        method: 'post',
        before: function(input) {
            index = layer.load(1);
        },
        success: function(res) {
            layer.close(index);
            if (res.code == 0) {
                $('#articleCoverSrc').val(res.results[0].path);
                $("#articleCoverImg").attr('src', res.results[0].path);
            } else {

            }
            layer.msg(res.msg);
        }
    });

    //自定义验证规则
    form.verify({
        required: function(value) {
            if (value.length < 1) {
                return '内容不能为空';
            }
        }
    });

    //监听添加提交
    form.on('submit(formAddArticle)', function(data) {
        var index = layer.load(1);
        var name = $('#categoryname input').val();
        data.field.categoryname = name;
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: '/api/saveArticle',
            data: JSON.stringify(data.field),
            datatype: 'json',
            async: false,
            success: function(res) {
                layer.close(index);
                if (res.code == 0) {
                    initilData(1, 10);
                }
            },
            error: function(e) {
                layer.close(index);
                layer.msg(e.responseText);
            }
        });
        return false;
    });


    //监听修改提交
    form.on('submit(formUpdataArticle)', function(data) {
        layui.form().render();
        var index = layer.load(1);
        var id = $('#BtnFromAddUp').attr('data-id');
        var name = $('#categoryname input').val();
        data.field.categoryname = name;
        data.field.id = id;
        console.log(data);
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: '/api/updateArticle',
            data: JSON.stringify(data.field),
            datatype: 'json',
            async: false,
            success: function(res) {
                layer.close(index);
                if (res.code == 0) {
                    initilData(1, 8);
                }
            },
            error: function(e) {
                layer.close(index);
                layer.msg(e.responseText);
            }
        });
        return false;
    });


});