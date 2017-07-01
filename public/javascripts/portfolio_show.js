/**
 * Created by Zihang Zhang on 2017/6/30.
 */

$(document).ready(function () {

    //内容解析

    var thisURL = document.URL;
    var index = -1;
    var getValue = thisURL.split('?')[1]

    if(getValue) {
        index = getValue.split("=")[1];

        getPortfolioById(index);

        var articleData = JSON.parse(localStorage.articleData);
        $("#title").html(articleData[index].Title);
        $("#author").html(articleData[index].Author);
        $("#pubTime").html(articleData[index].createdAt.split('T')[0]);
        $("#article").append(articleData[index].Content);

    }

    function getPortfolioById(index) {
        $.ajax({
            type: "post",
            url: "http://localhost:3000/portfolio/get_portfolio",
            dataType: "json",
            //传送请求数据
            data: {"id": id},
            success: function (data) {


            }
        });
    }

    //评论控制

    selectFromComments(article_ID);

    $("#backToProjectShow").click(function () {
        window.location.href = "../project_show.html";
    });

    $("#commentInput").keydown(function (e) {
        if(e.ctrlKey && e.which == 13 || e.which == 10) {
            $("#commentSubmit").trigger("click");
        }
    });

    $("#commentSubmit").click(function () {
        var strComment = $("#commentInput").val();
        if(strComment !== "") {
            commentSubmit(strComment);
        }
        else {
            $("#commentInput").attr("placeholder", "请输入评论内容");
        }
    });

    function commentSubmit(strComment) {

        if(index === -1) {
            return false;
        }

        if(!localStorage.username) {
            if(window.confirm('您尚未登录，是否跳转到登录页面？')){
                window.location.href = "../login.html";
                return true;
            }else{
                return false;
            }
        }
        else {
            $.ajax({
                //请求登录处理页
                type: "post",
                url: "http://localhost:3000/comment/save_comment",
                dataType: "json",
                //传送请求数据
                data: {
                    "User_Id": localStorage.user_id,
                    "Article_Id": article_ID,
                    "Content": strComment
                },
                success: function (data) {
                    if(data.state === 200 && data.msg === "评论成功") {
                        // alert("评论成功！");
                        $("#commentInput").val("");
                        selectFromComments(article_ID);
                        return true;
                    }
                    else {
                        alert("评论失败！")
                        return false;
                    }
                }
            });
            return true;
            // window.location.href = "../project_submit.html";
        }
    }

    function selectFromComments(id) {

        $("#articleComments").html("");

        $.ajax({
            type: "post",
            url: "http://localhost:3000/comment/get_comment",
            dataType: "json",
            //传送请求数据
            data: {"Article_Id": id},
            success: function (data) {

                if(data.length !== 0) {
                    $.each(data, function (i, val) {
                        $("#articleComments").prepend(addCommentElement(i, getName(val), val.Content));
                        // $("#articleIndex" + i).click(function () {
                        //     window.location.href = "../project_detailed.html?index=" + i;
                        // });
                    });
                    // window.localStorage.articleData = JSON.stringify(data);
                }
            }
        });

        function addCommentElement(i, name, content) {
            var html1 = '<div class="article-comments-unit" id="articleComment' + i +
                '">' +
                '<h3 class="article-comments-unit-username" id="commentUsername">' + name + '&nbsp;:&nbsp;' +
                '</h3><div class="article-comments-unit-content" id="commentContent">' + content +
                '</div></div>';

            return html1;
        }

        function getName(data) {

            if(data.Name) {
                // alert("name: " + data.Name);
                return data.Name;
            }
            else {
                // alert("username: " + data.Username);
                return data.Username;
            }
        }
    }

    //图片播放控制

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