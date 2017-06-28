/**
 * Created by Zihang Zhang on 2017/6/27.
 */

$(document).ready(function () {
    $("#username").focus();
    $("#username").keydown(function (e) {
        if(e.which == "13") {
            $("#password").focus();
        }
    });
    $("#password").keydown(function (e) {
        if(e.which == "13") {
            $("#pwdCheck").focus();
        }
    });
    $("#pwdCheck").keydown(function (e) {
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
        if($("#username").val().length < 6 || $("#username").val().length > 15){
            $("#error").show().html("用户名格式错误，请重新输入");
            $("#username").focus();
            return false;
        }
        if($("#password").val().length < 6 || $("#password").val().length > 15){
            $("#error").show().html("密码格式错误，请重新输入");
            $("#password").focus();
            return false;
        }
        if($("#pwdCheck").val() == null || $("#pwdCheck").val() == ""){
            $("#error").show().html("请确认密码");
            $("#password").focus();
            return false;
        }
        if($("#pwdCheck").val() != $("#password").val()){
            $("#error").show().html("密码不一致，请检查");
            $("#username").focus();
            return false;
        }
        return true;
    }
    $("#submit").click(function () {
        if (checkInput()) {
            var strUsername = $("#username").val();
            var strPassword = $("#password").val();
            $.ajax({
                type: "POST",
                //请求登录处理页
                url: "http://localhost:3000/api/users/register", //登录处理页
                dataType: "json",
                //传送请求数据
                data: { username: strUsername, password: strPassword },
                success: function (data) {
                    if(data.status === 1101 && data.message === "用户注册成功") {
                        alert("注册成功！");
                        window.location.href = "../login.html?username=" + data.username;
                    }
                    else {
                        $("#error").show().html("用户名已存在，请修改");
                    }
                }
                //     function (strValue) { //成功后返回的数据
                //     //根据返回值进行状态显示
                //     if (strValue == "True") {
                //         $(".main-login").html("成功！" + strValue);
                //     }
                //     else {
                //         $("#error").show().html("用户名或密码错误！" + strValue);
                //     }
                // }
            });
        } else {
            return false;
        }
    });

});