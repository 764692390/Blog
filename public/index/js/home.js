layui.use(['jquery', 'laypage'], function() {
    var $ = layui.jquery;
    var flow = layui.flow;
    var laypage = layui.laypage;
    $(function() {
        //播放公告
        playAnnouncement(3000);
    });

    function playAnnouncement(interval) {
        var index = 0;
        var $announcement = $('.home-tips-container>span');
        //自动轮换
        setInterval(function() {
            index++; //下标更新
            if (index >= $announcement.length) {
                index = 0;
            }
            $announcement.eq(index).stop(true, true).fadeIn().siblings('span').fadeOut(); //下标对应的图片显示，同辈元素隐藏
        }, interval);
    }

    //首页分页
    //HomeGetPage(1, 8);
    var fpage = false;
    laypage({
        cont: 'HomePage',
        pages: pagesize,
        groups: rows,
        skip: true,
        curr: 1,
        jump: function(obj, first) {
            var index = obj.curr;
            if (fpage) {
                HomeGetPage(index, rows);
            } else {
                fpage = true;
            }
        }
    });
    /*热文排行*/
    hotarticles('#hotarticles ul');
    //热门评论
    HotComment('.reping-list', 6);
    //热评用户
    Userqq('.hotusers-list', 10);


});