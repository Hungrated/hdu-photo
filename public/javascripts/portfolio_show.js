/**
 * Created by Zihang Zhang on 2017/6/30.
 */

$(document).ready(function () {
    var E = window.wangEditor;
    var editor = new E('commentInput');
    editor.config.menuFixed = false;

    editor.config.customUpload = false;

    editor.config.menus = [
        'emotion'
    ];
    editor.create();

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

});