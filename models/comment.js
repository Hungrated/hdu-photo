/**
 * Created by zwl on 2017/6/27.
 */

const config = require('config-lite')(__dirname).database;

const Sequelize = require('sequelize');

const sequelize = require('../libs/sequelize');

const users = require('./users');

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
    Comment.create({portfolio_id: portfolio_id,user_id:user_id, content: content,}, { fields: [ 'portfolio_id','user_id','content' ] }).then(function(result) {
        callback(null,result);
    })
}

function get_comment(portfolio_id,callback) {
    Comment.findAll({
        where:["portfolio_id=?",portfolio_id]
    }).then(function (result) {
        // var final_result = new Array();
        var name = "", username = "";

        let a = result.map(x => {
            return new Promise((resolve, reject) => {
                users.getUser_information (x.user_id, function (err, data) {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }
                    if (data === null)
                        resolve();
                    username = data.Username;
                    name = data.Name;
                    let final_result = {
                        "Id": x.Id,
                        "User_Id": x.User_Id,
                        "Username": username,
                        "Name": name,
                        "portfolio_id": x.portfolio_id,
                        "content": x.content
                        // "createdAt": x.createdAt,
                        // "updatedAt": x.updatedAt
                    };
                    resolve(final_result);
                });
            });
        });

        Promise.all(a).then(x => {
            callback(null, x);
        })
        //callback(null,final_result);
    });
}

// function get_comment(portfolio_id,callback) {
//     Comment.findAll({
//         'where': {
//             'portfolio_id':portfolio_id
//         }
//     }).then(function (result) {
//         callback(null,result);
//     });
// }

exports.save_comment = save_comment;
exports.get_comment = get_comment;