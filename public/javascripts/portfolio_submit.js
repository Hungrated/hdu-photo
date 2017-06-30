/**
 * Created by Zihang Zhang on 2017/6/30.
 */
wangEditor.config.printLog = false;
// wangEditor创建
var editor = new wangEditor('editor');
// 关闭菜单栏fixed
editor.config.menuFixed = false;
// 设置自定义上传的开关
editor.config.customUpload = true;
// 配置菜单UIW
editor.config.menus = [
    'source',
    'bold',
    'underline',
    'italic',
    'strikethrough',
    'eraser',
    'forecolor',
    'bgcolor',
    '|',
    'quote',
    'fontfamily',
    'fontsize',
    'head',
    'orderlist',
    'alignleft',
    'aligncenter',
    'alignright',
    'link',
    'table',
    'emotion',
    'img',
    'video',
    'location',
    'insertcode',
    'undo',
    'fullscreen'
];
editor.create();
// 点击label使editor聚焦
$('#editor-wrapper label').click(function() {
    editor.$txt.focus();
});

// Ajax提交数据
$('#submit').click(function(){

    $(this).attr('disabled','disabled');
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/blog/publish",
        data: {
            "user_id": localStorage.user_id,
            "title": $("#title").val(),
            "label": $("#tags").val(),
            "author": $("#author").val(),
            "content": $("#editor").val()
        },
        // $('form').serializeArray(),
        dataType: "json",
        success: function (data) {
            if (data.state === 200 && data.msg === "发布成功") {
                var arg = '发布成功！点击确定返回项目展示页';
                myAlert(arg);
                $('#confirm_btn').on('click', function() {
                    window.location.href = "../project_show.html";
                });
            } else {
                arg = "没有发布成功哦~请重新尝试";
                $('.submit').removeAttr('disabled');
                myAlert(arg);
                pubErrHandle();
            }
        },
        error: function (data) {
            arg = "没有发布成功哦~请重新尝试";
            $('.submit').removeAttr('disabled');
            myAlert(arg);
            pubErrHandle();
        }
    });
});

function pubErrHandle() {
    var confirm_btn = $('#confirm_btn');
    confirm_btn.on('click', function() {
        $('#myAlert').remove();
        $('#mask').remove();
    })
}