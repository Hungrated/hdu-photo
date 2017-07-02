/**
 * Created by Zihang Zhang on 2017/6/27.
 */

$(document).ready(function () {

    var tempPortfolio = {};

    window.localStorage.tempPortfolio = JSON.stringify(tempPortfolio);
    console.log(window.localStorage.tempPortfolio);

    var manageFlag = false;
    $("#btnManage").click(function () {
        if (!manageFlag) {
            $(".unit-delete").show();
            $("#btnManage").html("完成管理");
            manageFlag = true;
        }
        else {
            $(".unit-delete").hide();
            $("#btnManage").html("管 理");
            manageFlag = false;
        }
    });

    function profileShow() {
        var showName;
        $.ajax({
            type: "post",
            url: "http://localhost:3000/users/get_information",
            dataType: "json",
            data: {Id: localStorage.user_id},
            success: function (data) {

                if (data.Name) {
                    showName = data.Name;
                }
                else {
                    showName = data.Username;
                }

                $("#name").html(showName);
                // $("#sex").html(data.Sex);
                $("#description").html(data.Description);
            }
        });
    }

    function selectFromPortfolios(id) {

        $.ajax({
            type: "post",
            url: "http://localhost:3000/portfolio/get_portfolio",
            dataType: "json",
            //传送请求数据
            data: {"user_id": id},
            success: function (data) {

                if (data.length === 0) {
                    $("#empty").show();
                }
                else {
                    $("#empty").hide();
                    $.each(data, function (i, val) {
                        $("#layoutBody").prepend(addArticleElement(i, val.title, val.label, val.depic, val.cover_url));
                        $("#portfolio" + i).click(function () {
                            window.location.href = "../portfolio_show.html?index=" + val.id;
                        });
                        $("#unitDelete" + i).click(function () {
                            if (window.confirm('你确定要删除这个照片集吗？')) {
                                destroyPortfolio(val.id);
                                return true;
                            } else {
                                return false;
                            }

                        });
                    });
                    window.localStorage.articleData = JSON.stringify(data);
                }
            }
        });

        function addArticleElement(i, topic, label, description, url) {
            var html = '<div class="showcase-unit" >' +
                '<div class="showcase-unit-left" id="portfolio' + i + '">' +
                '<p class="showcase-unit-topic font18">' + topic + ' | ' + label +
                '</p>' +
                '<img src=' + url +
                ' style="width: 360px; height: 240px">' +
                '</div>' +
                '<div class="showcase-unit-right">' +
                '<div class="showcase-unit-description">' +
                description +
                '</div>' +
                '<button class="unit-delete font13" id="unitDelete' + i +
                '" style="display: none">删 除</button>' +
                '</div>' +
                '</div>';
            return html;
        }

        function destroyPortfolio(index) {
            $.ajax({
                type: "post",
                url: "http://localhost:3000/portfolio/del_portfolio",
                dataType: "json",
                //传送请求数据
                data: {"id": index},
                success: function () {
                    $("#layoutBody").html("");
                    selectFromPortfolios(localStorage.user_id);
                    $(".unit-delete").show();
                }
            });
        }
    }

    // function clearCurrentList() {
    //     $(".detailed-list-wrapper").html("");
    // }

    function profileEdit(index) {
        $.ajax({
            type: "post",
            url: "http://localhost:3000/users/get_information",
            dataType: "json",
            //传送请求数据
            data: {"Id": index},
            success: function (data) {
                // document.getElementById('photographerName').innerHTML = data.Name;
                $('#photographerName').html(data.Name);
                $('#photographerDescription').html(data.Description);
                $('#profileSubmit').click(function () {
                    $.ajax({
                        type: "post",
                        url: "http://localhost:3000/users/save_information",
                        dataType: "json",
                        //传送请求数据
                        data: {
                            "Id": index,
                            "Name": $('#photographerName').val(),
                            "Head": "null",
                            "Sex": $('#sex').val(),
                            "Description": $('#photographerDescription').val()
                        },
                        success: function (data) {
                            $("#name").html($('#photographerName').val());
                            $("#description").html($('#photographerDescription').val());
                            $('#profileEdit').fadeOut();
                        }
                    });
                });
            }
        });
    }


    function avatarEdit() {

        $("#avatarUpload").fadeIn();

        var options =
            {
                thumbBox: '.thumbBox',
                spinner: '.spinner',
                imgSrc: './images/avatar_default.png'
            };
        var cropper = $('.imageBox').cropbox(options);
        $('#upload-file').on('change', function () {
            var reader = new FileReader();
            reader.onload = function (e) {
                options.imgSrc = e.target.result;
                cropper = $('.imageBox').cropbox(options);
            };
            reader.readAsDataURL(this.files[0]);
            this.files = [];
        });
        $('#btnCrop').on('click', function () {
            $("#avatarUpload").fadeOut();

            //     var img = cropper.getDataURL();
            //     $('.cropped').html('');
            //     $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
            //     $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
            //     $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
        });
        $('#btnZoomIn').on('click', function () {
            cropper.zoomIn();
        });
        $('#btnZoomOut').on('click', function () {
            cropper.zoomOut();
        });

    }

    document.onclick = function (e) {
        $('#profileEdit').hide();
    };
    $('#name, #description').bind('click', function (e) {
        if ($('#profileEdit').css('display') === 'none') {
            $('#profileEdit').fadeIn();
            profileEdit(localStorage.user_id);
        } else {
            $('#profileEdit').fadeOut();
        }
        e = e || event;
        stopFunc(e);
    });

    //阻止向上传递事件
    $('#profileEdit').bind('click', function (e) {
        e = e || event;
        stopFunc(e);
    });

    function stopFunc(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }

    $("#avatar").click(function () {
        avatarEdit()
    });

    profileShow();
    selectFromPortfolios(localStorage.user_id);

});