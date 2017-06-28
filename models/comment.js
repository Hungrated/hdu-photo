/**
 * Created by zwl on 2017/6/27.
 */

const config = require('config-lite')(__dirname).database;

const Sequelize = require('sequelize');

const sequelize = require('../libs/sequelize');

const schema = {
    portfolio_id: {
        type: Sequelize.INTEGER(16),
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER(16),
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT('long')
    },
};

const Comment = sequelize.define('comment', schema);

Comment.sync().then();

function save_comment(portfolio_id,user_id,content,callback) {
    Comment.create({portfolio_id:profolio_id,user_id:user_id, content: content,}, { fields: [ 'portfolio_id','user_id','content' ] }).then(function(result) {
        callback(null,result);
    })
}

function get_comment(portfolio_id,callback) {
    Comment.findAll({
        'where': {
            'portfolio_id':portfolio_id
        }
    }).then(function (result) {
        callback(null,result);
    });
}

exports.save_comment = save_comment;
exports.get_comment = get_comment;