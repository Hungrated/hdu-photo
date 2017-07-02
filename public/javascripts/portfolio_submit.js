/**
 * Created by Zihang Zhang on 2017/6/30.
 */

'use strict';

$(document).ready(function () {

    wangEditor.config.printLog = false;
// wangEditor创建
    var editor = new wangEditor('editor');
// 关闭菜单栏fixed
    editor.config.menuFixed = false;
// 设置自定义上传的开关
    editor.config.customUpload = false;
// 配置菜单UIW
    editor.config.menus = [
        'bold',
        'underline',
        'italic',
        'eraser',
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
        'location',
        'undo',
        'fullscreen'
    ];

    editor.create();

// 点击label使editor聚焦
    $('#editor-wrapper label').click(function () {
        editor.$txt.focus();
    });

// Ajax提交数据
    $('#portfolioSubmit').click(function () {
        var tempPortfolio = JSON.parse(window.localStorage.tempPortfolio);
        if (!tempPortfolio.photo_url) {
            alert('请选择上传的图片！');
            return;
        }

        var cover_img = tempPortfolio.photo_url[0];
        var img = {width:3,height:2}; //new Image();
        // alert('width:' + img.width + ',height:' + img.height);
        // img.src = cover_img;

        tempPortfolio.user_id = localStorage.user_id;
        tempPortfolio.title = $('#title').val();
        tempPortfolio.label = $('#tags').val();
        tempPortfolio.cover_url = cover_img;
        tempPortfolio.width = img.width;
        tempPortfolio.height = img.height;
        tempPortfolio.depic = $('#editor').val();

        console.log(tempPortfolio);
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/portfolio/save_portfolio",
            dataType: "json",
            data: tempPortfolio,
            success: function (data) {
                console.log(data);
                if (data.state === 200) {
                    delete localStorage.tempPortfolio;
                    alert('发布成功！点击确定返回图库页面');
                    window.location.href = "../gallery.html";
                    // $('#confirm_btn').on('click', function () {
                    //     window.location.href = "../gallery.html";
                    // });
                }
            },
            error: function (e,a,b) {
                console.log(e);
                console.log(a);
                console.log(b);
                $('.submit').removeAttr('disabled');
                alert('发布失败，请重新尝试！');
            }
        });

    });

    // function pubErrHandle() {
    //     var confirm_btn = $('#confirm_btn');
    //     confirm_btn.on('click', function () {
    //         $('#myAlert').remove();
    //         $('#mask').remove();
    //     })
    // }

    // function myAlert(arg) {
    //     var conf = {}, $box, $mask;
    //     $box = $('<div id="myAlert">'+'<div class="title" >' + arg + '</div>'
    //         + '<div><button class="submit" id="confirm_btn">确定</button></div>'
    //         + '</div>').css({
    //         color: '#444',
    //         position: 'fixed',
    //         width: 400,
    //         height: 200,
    //         background: '#fff',
    //         'z-index': 10000,
    //         'border-radius': 7,
    //         'box-shadow': '0 1px 2px rgba(0,0,0,.5)'
    //     });
    //     $title = $box.find('.title').css({
    //         padding: '45px 10px 10px',
    //         'font-weight': 900,
    //         'font-size': 21,
    //         'text-align': 'center'
    //     })
    //     $mask = $('<div id="mask"></div>').css({
    //         position: 'fixed',
    //         top: 0,
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //         background: 'rgba(0,0,0,.3)',
    //         'z-index': 9999,
    //     });
    //     $box.find('.submit').css({
    //         'font-size': 22,
    //     });
    //     function adjust_box_pos() {
    //         var $window = $(window),
    //             window_width = $window.width(),
    //             window_height = $window.height(),
    //             box_width = $box.width(),
    //             box_height = $box.height(),
    //             move_x = (window_width - box_width) / 2;
    //         move_y = (window_height - box_height) / 2 - 80;
    //         $box.css({
    //             left: move_x,
    //             top: move_y,
    //         })
    //     }
    //     adjust_box_pos();
    //     $(window).on('resize',function() {
    //         adjust_box_pos();
    //     })
    //     if (typeof arg === 'string') {
    //         conf = arg;
    //     } else {
    //         conf = $.extend(conf, arg);
    //     }
    //     $('body').append($mask).append($box);
    // }
});