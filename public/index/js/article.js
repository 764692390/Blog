layui.use(['jquery', 'laypage'], function() {
    var $ = layui.jquery;
    var laypage = layui.laypage;

    //首页分页
    var v = $('#v_hiden').val();
    if (v != 'false') {
        HomeGetPage(1, 8, $('#v_hiden').val());
    } else {
        HomeGetPage(1, 8);
    }

    //热门评论
    HotComment('.reping-list', 6);
    //热评用户
    Userqq('.hotusers-list', 10);

});