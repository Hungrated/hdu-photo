/**
 * Created by Zihang Zhang on 2017/6/30.
 */

$(document).ready(function () {

    var index = 0;
    var length = $("#img img").length;
    var i = 1;

    //关键函数：通过控制i ，来显示图片
    function showImg(i) {
        $("#img img").eq(i).stop(true, true).fadeIn(800).siblings("img").hide();
        $("#cbtn li").eq(i).addClass("hov").siblings().removeClass("hov");
    }

    function slideNext() {
        if (index >= 0 && index < length - 1) {
            ++index;
            showImg(index);
        } else {
            if (confirm("浏览完毕，是否跳回开头？")) {
                showImg(0);
                index = 0;
                aniPx = (length - 5) * 142 + 'px'; //所有图片数 - 可见图片数 * 每张的距离 = 最后一张滚动到第一张的距离
                $("#cSlideUl ul").animate({"left": "+=" + aniPx}, 200);
                i = 1;
            }
            return false;
        }
        if (i < 0 || i > length - 5) {
            return false;
        }
        $("#cSlideUl ul").animate({"left": "-=142px"}, 200)
        i++;
    }

    function slideFront() {
        if (index >= 1) {
            --index;
            showImg(index);
        }
        if (i < 2 || i > length + 5) {
            return false;
        }
        $("#cSlideUl ul").animate({"left": "+=142px"}, 200)
        i--;
    }

    $("#img img").eq(0).show();
    $("#cbtn li").eq(0).addClass("hov");

    $(".picSildeRight,#next").click(function () {
        slideNext();
    });

    $(".picSildeLeft,#front").click(function () {
        slideFront();
    });

    $("#cbtn li").click(function () {
        index = $("#cbtn li").index(this);
        showImg(index);
    });

    $("#next,#front").hover(function () {
        $(this).children("a").fadeIn();
    }, function () {
        $(this).children("a").fadeOut();
    });

    $("#cbtnWrapper").hover(function () {
        $("#cbtn").fadeIn();
    }, function () {
        $("#cbtn").fadeOut();
    });

    document.onclick = function (e) {
        $('#editComment').hide();
    };
    $('#comment').bind('click', function (e) {
        if ($('#editComment').css('display') === 'none') {
            $('#editComment').show();
        } else {
            $('#editComment').hide();
        }
        e = e || event;
        stopFunc(e);
    });

    //阻止向上传递事件
    $('#editComment').bind('click', function (e) {
        e = e || event;
        stopFunc(e);
    });

    function stopFunc(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }

    var E = window.wangEditor;
    var editor = new E('commentInput');
    editor.config.menuFixed = false;

    editor.config.customUpload = false;

    editor.config.menus = [
        'emotion'
    ];
    editor.create();

    $('#submit').click(function () {

        $(this).attr('disabled', 'disabled');
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
                    $('#confirm_btn').on('click', function () {
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