/**
 * Created by zwl on 2017/6/28.
 */
var express = require('express');
var router = express.Router();

const Portfolio = require('../models/users');


const SAVE_SUCCESS = {
    state: 200,
    msg: '保存成功'
};
const UPDATE_SUCCESS = {
    state: 200,
    msg: '更新成功'
};

router.post('/save_portfolio', function (req, res, next) {


    var user_id = req.body.user_id ,
        title = req.body.title,
        label = req.body.label,
        cover_url = req.body.cover_url,
        photo_url = JSON.stringify(req.body.photo_url),
        width = req.body.width,
        height = req.body.height,
        popularity = 0,
        depic = req.body.depic;

    Portfolio.save_portfolio(user_id,title,label,cover_url,photo_url,width,height, popularity, depic,function (err,result) {
        if(result)
        {
            res.json(SAVE_SUCCESS);
        }
        else
        {
            res.locals.error = err;
        }
    });

    // console.log(req.body);
    //
    // var user_id = req.body.user_id,
    //     title = req.body.title,
    //     label = req.body.label,
    //     cover_url = req.body.cover_url,
    //     photo_url = JSON.stringify(req.body.photo_url),
    //     width = req.body.width,
    //     height = req.body.height,
    //     depic = req.body.depic;
    //
    // Portfolio.save_portfolio(user_id, title, label, cover_url, photo_url, width, height, depic)
    //     .then(result => {
    //         res.json(SAVE_SUCCESS);
    //     })
    //     .catch(e => {
    //         console.error(e);
    //         res.json({
    //             state: 4400,
    //             msg: '错误'
    //         })
    //     });
});

router.post('/save_popularity', function (req, res, next) {

    var action = req.body.action,
        id = req.body.id;
    var count = 0;
    let promise = new Promise(function (resolve, rejeact) {
        Portfolio.get_portfolio_by_id(id, function (err, result) {
            console.log(result.popularity);
            count = result.popularity;
            resolve();
        });
    });
    promise.then(function () {
        if (action == 1) {
            console.log(count);
            count = count + 1;
            Portfolio.save_popularity(id, count, function (err, result) {
                if (result) {
                    res.send(result);
                }
                else {
                    res.locals.error = err;
                }

            })
        }
        else if (action == 0) {
            count = count - 1;
            Portfolio.save_popularity(id, count, function (err, result) {
                if (result) {
                    res.send(result);
                }
                else {
                    res.locals.error = err;
                }

            });
        }
    });
});

router.post('/get_portfolio', function (req, res, next) {
    var user_id = req.body.user_id;

    Portfolio.get_portfolio(user_id, function (err, result) {
        if (err) return next(err);
        // console.log(result[0].User_Id);
        res.send(result)
        //res.json(result);
    });
});

router.post('/get_portfolio_by_id', function (req, res, next) {
    var id = req.body.id;

    Portfolio.get_portfolio_by_id(id, function (err, result) {
        if (err) return next(err);
        // console.log(result[0].User_Id);
        res.send(result)
        //res.json(result);
    });
});

router.get('/get_photos',function (req,res,next) {
    var page = req.param("page");
    var count=10;
    Portfolio.get_photos(page,count,function (err,result) {
        if(err) return next(err);
        // console.log(result[0].User_Id);
        res.send(result)
        //res.json(result);
    });
});

router.get('/get_rank',function (req,res,next) {
    var page = req.param("page");
    var count=2;
    Portfolio.get_rank(count,page,function (err,result) {
        if(err) return next(err);
        // console.log(result[0].User_Id);
        res.send(result)
        //res.json(result);
    });
});

router.get('/get_recent',function (req,res,next) {
    var page = req.param("page");
    var count=2;
    Portfolio.get_recent(count,page,function (err,result) {
        if(err) return next(err);
        res.send(result)
    });
});

router.get('/get_recentRank',function (req,res,next) {
    var date =new Date();
    var page = req.param("page");
    var count=2;
    console.log(date);
    Portfolio.get_recentRank(date,count,page,function (err,result) {
        if(err) return next(err);
        // console.log(result[0].User_Id);
        res.send(result)
        //res.json(result);
    });
});

module.exports = router;