layui.define(['laypage', 'layer', 'form', 'pagesize'], function(exports) {
    var $ = layui.jquery,
        layer = layui.layer,
        form = layui.form(),
        laypage = layui.laypage;
    var laypageId = 'categoryPage';

    initilData(1, 8);
    //页数据初始化
    //currentIndex：当前也下标
    //pageSize：页容量（每页显示的条数）
    function initilData(currentIndex, pageSize) {
        var index = layer.load(1);
        $.ajax({
            type: 'get',
            url: '/api/category',
            success: function(data) {
                layer.close(index);
                if (data.code != 0) {
                    layer.msg(data.msg, { icon: 2 });
                    return false;
                }
                var data = data.result;
                htmlTo(data)
            },
            error: function(e) {
                var message = e.responseText;
                layer.close(index);
                layer.msg(message, { icon: 2 });
            }
        });

        //数据加载
        function htmlTo(data) {
            layer.close(index);
            //计算总页数（一般由后台返回）
            pages = Math.ceil(data.length / pageSize);
            //模拟数据分页（实际上获取的数据已经经过分页）
            var skip = pageSize * (currentIndex - 1);
            var take = skip + Number(pageSize);
            data = data.slice(skip, take);
            var html = ''; //由于静态页面，所以只能作字符串拼接，实际使用一般是ajax请求服务器数据
            html += '<table style="" class="layui-table" lay-even>';
            html += '<colgroup><col width="180"><col><col width="180"><col width="90"><col width="90"></colgroup>';
            html += '<thead><tr><th>发表时间</th><th>类别</th><th>作者</th><th  colspan="2">操作</th></tr></thead>';
            html += '<tbody>';
            //遍历文章集合
            for (var i = 0; i < data.length; i++) {
                var item = data[i];

                html += "<tr>";
                html += "<td>" + new Date(parseInt(item.addtime)).format("yyyy-MM-dd HH:mm:ss") + "</td>";
                html += "<td>" + item.name + "</td>";
                html += "<td>" + item.username + "</td>";
                html += '<td><button class="layui-btn layui-btn-small layui-btn-normal" onclick="layui.category.editData(\'' + item._id + '\')"><i class="layui-icon">&#xe642;</i></button></td>';
                html += '<td><button class="layui-btn layui-btn-small layui-btn-danger" onclick="layui.category.deleteData(\'' + item._id + '\')"><i class="layui-icon">&#xe640;</i></button></td>';
                html += "</tr>";
            }
            html += '</tbody>';
            html += '</table>';
            html += '<div id="' + laypageId + '"></div>';

            $('#categoryContent').html(html);
            form.render('checkbox'); //重新渲染CheckBox，编辑和添加的时候
            $('#categoryConsole,#category').attr('style', 'display:block'); //显示FiledBox

            laypage({
                cont: laypageId,
                pages: pages,
                groups: 8,
                skip: true,
                curr: currentIndex,
                jump: function(obj, first) {
                    var currentIndex = obj.curr;
                    if (!first) {
                        initilData(currentIndex, pageSize);
                    }
                }
            });
            //该模块是我定义的拓展laypage，增加设置页容量功能
            //laypageId:laypage对象的id同laypage({})里面的cont属性
            //pagesize当前页容量，用于显示当前页容量
            //callback用于设置pagesize确定按钮点击时的回掉函数，返回新的页容量
            layui.pagesize(laypageId, pageSize).callback(function(newPageSize) {
                //这里不能传当前页，因为改变页容量后，当前页很可能没有数据
                initilData(1, newPageSize);
            });
        };
    }


    //输出接口，主要是两个函数，一个删除一个编辑
    var category = {
        editData: function(id) {
            layer.msg('编辑Id为【' + id + '】的数据--功能正在开发中...');
        },
        deleteData: function(id) {
            layer.confirm('确定删除？', {
                btn: ['确定', '取消'] //按钮
            }, function() {
                layer.msg('删除Id为【' + id + '】的数据--功能正在开发中...');
                // $.ajax({
                //     type: 'post',
                //     url: '/api/removeArticle',
                //     data: {
                //         id: id,
                //         type: 'none'
                //     },
                //     success: function(msg) {
                //         layer.msg(msg.msg);
                //         setTimeout(function() {
                //             initilData(1, 10);
                //         }, 500)

                //     },
                //     error: function(e) {
                //         var message = e.responseText;
                //         layer.msg(message, { icon: 2 });
                //     }
                // });
            }, function() {

            });
        }
    };


    exports('category', category);
});