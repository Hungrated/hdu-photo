/**
 * Created by Zihang Zhang on 2017/6/27.
 */

$(document).ready(function () {
    var thisURL = document.URL;

    if(getValue = thisURL.split('?')[1]) {
        var username = getValue.split("=")[1];
        document.getElementById("username").value = username;
        $("#password").focus();
    }
    else {
        $("#username").focus();
    }

    $("#username").keydown(function (e) {
        if(e.which == "13") {
            $("#password").focus();
        }
    });
    $("#password").keydown(function (e) {
        if(e.which == "13") {
            $("#submit").trigger("click");
        }
    });

    function checkInput() {
        if($("#username").val() == null || $("#username").val() == ""){
            $("#error").show().html("请输入用户名");
            $("#username").focus();
            return false;
        }
        if($("#password").val() == null || $("#password").val() == ""){
            $("#error").show().html("请输入密码");
            $("#password").focus();
            return false;
        }
        return true;
    }

    $("#submit").click(function () {
        if(checkInput()) {
            var strUsername = encodeURI($("#username").val());
            var strPassword = encodeURI($("#password").val());

            $.ajax({
                type: "post",
                url: "http://localhost:3000/users/login",
                dataType: "json",
                data: { username: strUsername, password: strPassword },
                success: function (data) {
                    if(data.state === 200 && data.msg === "登录成功") {
                        alert("登录成功！");
                        window.localStorage.username = data.username;
                        window.localStorage.user_id = data.user_id;
                        console.log(localStorage.username);
                        window.location.href = "../index.html";
                    }
                    else {
                        $("#error").show().html("用户名或密码错误");
                    }
                }
            });
        }else{
            return false;
        }

    });
});