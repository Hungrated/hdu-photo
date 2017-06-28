/**
 * Created by Zihang Zhang on 2017/6/27.
 */

$(document).ready(function () {
    if(!localStorage.username) {
        $("#userCenter").hide();
        document.getElementById("requireLogin").href = "../login.html";
    }
    else {
        $("#btnLogin").hide();
        $("#username").text(localStorage.username);
        $("#userCenter").show();
    }

    $("#btnLogout").click(function () {
        if(window.confirm('你确定要退出登录吗？')){
            delete localStorage.username;
            delete localStorage.user_id;
            $.get("http://localhost:3000/users/logout");
            $("#userCenter").hide();
            $("#btnLogin").show();
            alert("已注销！");
            return true;
        }else{
            return false;
        }
    });

    $("#header-gallery").click(function () {
        if(!localStorage.username) {
            if(window.confirm('您尚未登录，是否跳转到登录页面？')){
                return true;
            }else{
                return false;
            }
        }
    });

});