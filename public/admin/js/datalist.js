layui.define(['laypage', 'layer', 'form', 'pagesize'], function(exports) {
    var $ = layui.jquery,
        layer = layui.layer,
        form = layui.form(),
        laypage = layui.laypage;
    var laypageId = 'pageNav';
    //获取文章分类
    function getCategory(obj, index) {
        $.ajax({
            type: 'get',
            url: '/api/category',
            dataType: "json",
            success: function(data) {
                if (data.code != 0) {
                    layer.msg(data.msg, { icon: 2 });
                    return false;
                }
                var data = data.result;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    if (index && index == data[i].value) {
                        str += '<option selected="selected" value="' + data[i].value + '">' + data[i].name + '</option>'
                    } else {
                        str += '<option value="' + data[i].value + '">' + data[i].name + '</option>'
                    }
                }
                $(obj).append(str);

                form.render(); //更新全部

            },
            error: function(e) {
                var message = e.responseText;
                layer.msg(message, { icon: 2 });
            }
        });
    }


    //获取文章分类列表页
    getCategory('#category-d');
    initilData(1, 8);
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

    //监听置顶CheckBox
    form.on('checkbox(stick)', function(data) {
        $.ajax({
            type: 'post',
            url: '/api/stick',
            dataType: "json",
            data: {
                id: data.value,
                stick: data.elem.checked
            },
            success: function(msg) {
                if (msg.code != 0) {
                    data.elem.checked = !data.elem.checked;
                    layer.msg(msg.msg, { icon: 2 });
                    return false;
                }
                data.elem.checked = data.elem.checked;
                layer.msg(msg.msg);
                form.render(); //重新渲染
            }

        })
    });

    //监听推荐CheckBox
    form.on('checkbox(recommend)', function(data) {
        $.ajax({
            type: 'post',
            url: '/api/recommend',
            dataType: "json",
            data: {
                id: data.value,
                recommend: data.elem.checked
            },
            success: function(msg) {
                if (msg.code != 0) {
                    data.elem.checked = !data.elem.checked;
                    layer.msg(msg.msg, { icon: 2 });
                    return false;
                }
                data.elem.checked = data.elem.checked;
                layer.msg(msg.msg);
                form.render(); //重新渲染
            }

        })
    });
    //发表文章
    function PushArticle(title, id, fn) {
        var index = layer.load(1);
        $.ajax({
            type: 'post',
            url: '/admin/addArticle/add',
            success: function(data) {
                layer.close(index);
                $('#dataContent').html(data);
                $('#articleBoxTitle').text(title);
                $('#dataConsole').attr('style', 'display:none');
                $('#articleBack').bind('click', function() {
                    initilData(1, 8);
                });
                /*修改*/
                if (id) {
                    getArticle(id);
                    $('#BtnFromAddUp').attr({ 'lay-filter': 'formUpdataArticle', 'data-id': id });
                } else {
                    var content = "";
                    kedit('#editor_id', content); //初始化编辑器
                    /*获取文章分类列表 */
                    getCategory("#categoryvalue");
                    layui.form().render();
                    $('#BtnFromAddUp').attr('lay-filter', 'formAddArticle');
                }

            },
            error: function(e) {
                var message = e.responseText;
                layer.close(index);
                layer.msg(message, { icon: 2 });
            }
        });
    }
    //获取文章详情
    function getArticle(id) {
        $.ajax({
            type: 'get',
            url: '/api/getArticle',
            data: {
                id: id
            },
            success: function(msg) {
                console.log(msg);
                $('#dataContent input[name="title"]').val(msg.result.title);
                $('#dataContent input[name="abstract"]').val(msg.result.abstract);
                $('#dataContent input[name="title"]').val(msg.result.title);
                $('#dataContent input[name="title"]').val(msg.result.title);
                $('#dataContent input[name="stick"]').attr('checked', msg.result.stick);
                $('#dataContent input[name="recommend"]').attr('checked', msg.result.recommend);
                $('#articleCoverImg').attr('src', msg.result.coverImg);
                $('#articleCoverSrc').val(msg.result.coverImg);
                $('.ke-edit-textarea').val(msg.result.content);
                $('#editor_id').val(msg.result.content);
                kedit('#editor_id', msg.result.content); //初始化编辑器
                /*获取文章分类列表*/
                getCategory("#categoryvalue", msg.result.categoryvalue);
                layui.form().render();
            },
            error: function(e) {
                var message = e.responseText;
                layer.msg(message, { icon: 2 });
            }
        });
    }
    //发表文章
    $('#addArticle').click(function() {
        PushArticle('添加文章');
    });



    //输出接口，主要是两个函数，一个删除一个编辑
    var datalist = {
        deleteData: function(id) {
            layer.confirm('确定删除？', {
                btn: ['确定', '取消'] //按钮
            }, function() {
                $.ajax({
                    type: 'post',
                    url: '/api/removeArticle',
                    data: {
                        id: id,
                        type: 'none'
                    },
                    success: function(msg) {
                        layer.msg(msg.msg);
                        setTimeout(function() {
                            initilData(1, 10);
                        }, 500)

                    },
                    error: function(e) {
                        var message = e.responseText;
                        layer.msg(message, { icon: 2 });
                    }
                });
            }, function() {

            });
        },
        editData: function(id) {
            //修改文章
            PushArticle('修改文章', id, getArticle);
        }
    };


    exports('datalist', datalist);
});