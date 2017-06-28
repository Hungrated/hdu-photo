/**
 * Created by ywj15 on 2016/10/22 0022.
 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    hash = require('./pass').hash;

var app = express();

function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
};

