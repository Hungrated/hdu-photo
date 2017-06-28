/**
 * Created by zwl on 2017/6/27.
 */
var express = require('express');
var router = express.Router();

const Comment = require('../models/comment');

const PUBLISH_SUCCESS = {
    state:200,
    msg:'评论成功'
};

router.post('/save_comment', function (req,res,next) {

    var portfolio_id = req.body.portfolio_id ,
        user_id = req.body.user_id,
        content = req.body.content;

    Comment.save_comment(portfolio_id,user_id,content,function (err,result) {
       if(result)
        {
            res.json(PUBLISH_SUCCESS);
        }
        else
        {
            res.locals.error = err;
        }
    });
});

router.post('/get_comment',function (req,res,next) {
    var portfolio_id = req.body.portfolio_id;

    Comment.get_comment(portfolio_id,function (err,result) {
        if(err) return next(err);
        // console.log(result[0].User_Id);
        res.send(result)
        //res.json(result);
    });
});

module.exports = router;