/**
 * Created by zwl on 2017/6/28.
 */
var express = require('express');
var router = express.Router();

const Portfolio = require('../models/portfolio');

const SAVE_SUCCESS = {
    state:200,
    msg:'保存成功'
};

router.post('/save_portfolio', function (req,res,next) {

    var user_id = req.body.user_id ,
        title = req.body.title,
        label = req.body.label,
        cover_url =req.body.cover_url,
        photo_url  =req.body.photo_url;

    Portfolio.save_portfolio(user_id,title,label,cover_url,photo_url,function (err,result) {
        if(result)
        {
            res.json(SAVE_SUCCESS);
        }
        else
        {
            res.locals.error = err;
        }
    });
});

router.post('/save_popularity', function (req,res,next) {

    var action = req.body.action_type,
        id =req.body.id,
        count = 0;
    let promise = new Promise(function(resolve,rejeact){
        Portfolio.save_popularity(id,function (err,result) {
           count = result.id;
            resolve();
        });
    });

        promise.then(function(){
        if(action == 1){
            count = count+1;
            Portfolio.save_popularity(count,function (err,result) {
                if (result) {
                    res.json(SAVE_SUCCESS);
                }
                else {
                    res.locals.error = err;
                }

            })
        }
        else if(action == 0){
            count = count -1;
            Portfolio.save_portfolio(count,function (err,result) {
                if(result)
                {
                    res.json(SAVE_SUCCESS);
                }
                else
                {
                    res.locals.error = err;
                }

            });
        }
     });
});



router.post('/get_portfolio',function (req,res,next) {
    var user_id = req.body.user_id;

    Portfolio.get_portfolio(user_id,function (err,result) {
        if(err) return next(err);
        // console.log(result[0].User_Id);
        res.send(result)
        //res.json(result);
    });
});

module.exports = router;