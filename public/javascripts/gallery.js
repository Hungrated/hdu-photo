/**
 * Created by Zihang Zhang on 2017/6/27.
 */

$(document).ready(function () {
    var manageFlag = false;
    $("#btnManage").click(function () {
        if(!manageFlag) {
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

    $("#btnSimple").click(function () {
        $(".showcase-unit-right").hide();
        $(".showcase-unit").attr("width", "405px");

    });

    $("#btnDetailed").click(function () {
        $(".showcase-unit-right").show();
    });

});