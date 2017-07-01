/**
 * Created by Zihang Zhang on 2017/6/27.
 */

$(document).ready(function () {

    var tempPortfolio = {
        // "user_id": undefined,
        // "title": undefined,
        // "label": undefined,
        // "cover_url": undefined,
        // "photo_url": undefined,
        // "width": undefined,
        // "height": undefined,
        // "depic": undefined
    };

    window.localStorage.tempPortfolio = JSON.stringify(tempPortfolio);
    console.log(window.localStorage.tempPortfolio);

    var manageFlag = false;
    $("#btnManage").click(function () {
        if(!manageFlag) {
            $(".unit-delete").fadeIn();
            $("#btnManage").html("完成管理");
            manageFlag = true;
        }
        else {
            $(".unit-delete").fadeOut();
            $("#btnManage").html("管 理");
            manageFlag = false;
        }
    });

    var showName;
    $.ajax({
        type: "post",
        url: "http://localhost:3000/users/get_information",
        dataType: "json",
        data: { Id: localStorage.user_id },
        success: function (data) {

            if(data.Name) {
                showName = data.Name;
            }
            else {
                showName = data.Username;
            }

            $("#name").show().html(showName);
            // $("#sex").show().html(data.Sex);
            $("#description").show().html(data.description);
        }
    });

    function selectFromPortfolios(id) {

        $.ajax({
            type: "post",
            url: "http://localhost:3000/portfolio/get_portfolio",
            dataType: "json",
            //传送请求数据
            data: {"user_id": id},
            success: function (data) {

                if(data.length === 0) {
                    $("#empty").show();
                }
                else {
                    $("#empty").hide();
                    $.each(data, function (i, val) {
                        $("#layoutBody").prepend(addArticleElement(i, val.title, val.label, val.depic, val.cover_url));
                        $("#portfolio" + i).click(function () {
                            alert(JSON.stringify(val));
                            window.location.href = "../portfolio_show.html?index=" + val.id;
                        });
                    });
                    window.localStorage.articleData = JSON.stringify(data);
                }
            }
        });

        function addArticleElement(i, topic, label, description, url) {
            var html = '<div class="showcase-unit" id="portfolio' + i +
                '">' +
                '<div class="showcase-unit-left">' +
                '<p class="showcase-unit-topic font18">' + topic + ' | ' + label +
                '</p>'+
                '<img src=' + url +
                ' style="width: 360px; height: 240px">'+
                '</div>'+
                '<div class="showcase-unit-right">'+
                '<div class="showcase-unit-description">'+
                description +
            '</div>'+
            '<button class="unit-delete font13" id="unitDelete0" style="display: none">删 除</button>'+
            '</div>'+
            '</div>';
            return html;
        }
    }

    // function clearCurrentList() {
    //     $(".detailed-list-wrapper").html("");
    // }

    selectFromPortfolios(localStorage.user_id);

});