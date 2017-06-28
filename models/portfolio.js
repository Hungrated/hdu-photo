/**
 * Created by zwl on 2017/6/27.
 */
const config = require('config-lite')(__dirname).database;

const Sequelize = require('sequelize');

const sequelize = require('../libs/sequelize');

const schema = {
    user_id: {
        type: Sequelize.INTEGER(16),
        allowNull: false
    },
    title: {
        type: Sequelize.TEXT('long')

    },
    label: {
        type: Sequelize.TEXT('long')
    },
    cover_url: {
        type: Sequelize.STRING(64)
    },
    photo_url: {
        type: Sequelize.STRING(128)
    },
    popularity:{
        type:Sequelize.INTEGER(64)
    }
};

const Portfolio = sequelize.define('portfolio', schema);

Portfolio.sync().then();

function save_portfolio(user_id,title,label,cover_url,photo_url,callback) {
    Portfolio.create({user_id:user_id,title:title,label: label,cover_url:cover_url,photo_url:photo_url}, { fields: [ 'user_id','title','label','cover_url','photo_url'] }).then(function(result) {
        callback(null,result);
    })
}

function save_popularity(popularity,callback) {
    Portfolio.update({popularity:popularity}, { fields: [ 'popularity'] }).then(function(result) {
        callback(null,result);
    })
}

function get_portfolio(id,callback) {
    Portfolio.findAll({
        'where': {
            'id':id
        }
    }).then(function (result) {
        callback(null,result);
    });
}


exports.save_portfolio = save_portfolio;
exports.get_portfolio = get_portfolio;
exports.save_popularity = save_popularity;

