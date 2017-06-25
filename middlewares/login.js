/**
 * Created by Zihang Zhang on 2017/6/4.
 */

function checkLogin(req, res, next) {
    if(!req.session.isLogin) {
        return res.json({
            status: 1104,
            message: '您尚未登录'
        });
    }

    next();
}

function checkNotLogin(req, res, next) {
    if(req.session.isLogin) {
        return res.json({
            status: 1104,
            message: '您已登录'
        });
    }

    next();
}

module.exports = {checkLogin, checkNotLogin};