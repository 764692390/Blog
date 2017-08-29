/*代码高亮显示 */
prettyPrint();

layui.use(['form', 'layedit'], function() {
    var form = layui.form();
    var $ = layui.jquery;
    var layedit = layui.layedit;

    //热门评论
    HotComment('.reping-list', 6);
    //热评用户
    Userqq('.hotusers-list', 10);
});