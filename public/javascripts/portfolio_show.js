/**
 * Created by Zihang Zhang on 2017/6/30.
 */

$(document).ready(function () {

    //内容解析

    var thisURL = document.URL;
    var index = -1;
    var getValue = thisURL.split('?')[1];
    var popularity = 0;

    var photographerId = -1;

    if(getValue) {
        index = getValue.split("=")[1];
        selectFromComments(index);
        getPortfolioById(index);


        $("#commentInput").keydown(function (e) {
            if(e.ctrlKey && e.which == 13 || e.which == 10) {
                $("#commentSubmit").trigger("click");
            }
        });

        $("#commentSubmit").click(function () {
            var strComment = $("#commentInput").val();
            if(strComment !== "") {
                index = getValue.split("=")[1];
                commentSubmit(strComment, index);
            }
            else {
                alert('请输入评论内容');
            }
        });

    }

    function getPortfolioById(index) {

        $.ajax({
            type: "post",
            url: "http://localhost:3000/portfolio/get_portfolio_by_id",
            dataType: "json",
            //传送请求数据
            data: {"id": index},
            success: function (data) {
                photographerId = data.user_id;
                getUserById(photographerId);
                $('#portfolioTitle').html(data.title);
                $('#label').html(data.label);
                $('#portfolioDescription').html(data.depic);
                popularity = data.popularity;
                $('#popularity').html(popularity);

                var photo_url = JSON.parse(data.photo_url);
                if(photo_url.length !== 0) {
                    $.each(photo_url, function (i, val) {
                        addImg(val);
                    });
                }
                imgCtrl();
            }
        });
    }

    function addImg(val) {
        $("#img").prepend('<img src=' + val + '>');
        $("#cSlideUl ul").append('<li><img src=' + val + '></li>');
    }

    function getUserById (index) {
        $.ajax({
            type: "post",
            url: "http://localhost:3000/users/get_information",
            dataType: "json",
            //传送请求数据
            data: {"Id": index},
            success: function (data) {
                $('#photographerName').html(getName(data));
                $('#photographerDescription').html(data.description);
            }
        });
    }

    //评论控制

    function commentSubmit(strComment, index) {

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
                    "portfolio_id": index,
                    "user_id": localStorage.user_id,
                    "content": strComment
                },
                success: function (data) {
                    if(data.state === 200 && data.msg === "评论成功") {
                        // alert("评论成功！");
                        $("#editComment").fadeOut();
                        editor.$txt.html('<p><br></p>');
                        selectFromComments(index);
                        return true;
                    }
                    else {
                        alert("评论失败！");
                        return false;
                    }
                }
            });
            return true;
        }
    }

    function selectFromComments(id) {

        $("#comments").html("");

        $.ajax({
            type: "post",
            url: "http://localhost:3000/comment/get_comment",
            dataType: "json",
            data: {"portfolio_id": id},
            success: function (data) {
                if(data.length !== 0) {
                    $.each(data, function (i, val) {
                        $("#comments").prepend(addCommentElement(i, getName(val), val.content));
                    });
                }
            }
        });
    }

    function addCommentElement(i, name, content) {
        var html = '<div class="comment-unit" id="commentUnit"' + i +
            '><p>' + name +
            '</p><p>:&nbsp;</p>' + content +
            '</div>';
        return html;
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

    //图片播放控制
    function imgCtrl() {
        var index = 0;
        var length = $("#img img").length;
        var i = 1;

        //关键函数：通过控制i ，来显示图片

        function showImg(i) {
            $("#img img").eq(i).stop(true, true).fadeIn(450).siblings("img").hide();
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
    }

    document.onclick = function (e) {
        $('#editComment').hide();
    };
    $('#comment').bind('click', function (e) {
        if ($('#editComment').css('display') === 'none') {
            $('#editComment').fadeIn();
        } else {
            $('#editComment').fadeOut();
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

    // 点赞

    $('#like').click(function () {
        index = getValue.split("=")[1];
        $.ajax({
            type: "post",
            url: "http://localhost:3000/portfolio/save_popularity",
            dataType: "json",
            data: {
                "id": index,
                "action": 1
            },
            success: function () {
                popularity = document.getElementById('popularity').innerHTML;
                document.getElementById('popularity').innerHTML = parseInt(popularity) + 1;
            }
        });
    });

});