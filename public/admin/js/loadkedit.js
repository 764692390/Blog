//初始化编辑框
//kedit textarea对象Id选择器,content 编辑器内容
function kedit(kedit, content) {
    var options = {
        urlType: '127.0.0.1:3000', //带域名的路径
        themeType: 'default',
        cssPath: ['/admin/plugin/kindeditor/plugins/code/prettify.css', '/admin/plugin/layui/css/layui.css'],
        resizeType: 0,
        minChangeSize: 2, //撤销的最小字符
        uploadJson: '/apiProxy/kindeditor/asp.net/upload_json.ashx',
        fileManagerJson: '/apiProxy/kindeditor/asp.net/file_manager_json.ashx',
        fillDescAfterUploadImage: true, //图片编辑
        items: [
            'source', '|', 'preview', 'code', '|', 'justifyleft', 'justifycenter', 'justifyright',
            'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
            'superscript', 'clearhtml', 'quickformat', '|', 'fullscreen', '/',
            'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
            'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',
            'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'anchor',
            'link', 'unlink'
        ],
        afterBlur: function() { this.sync(); },
        filterMode: true,
    };
    //初始化编辑器
    var editor = KindEditor.create(kedit, options);
    //var autoheight = editor.edit.doc.body.scrollHeight;
    //editor.edit.setHeight(autoheight);
    //由于内容的html用Razor输出格式有问题，所以只能Ajax再请求一次内容
    editor.html(content);
}