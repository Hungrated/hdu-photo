/**
 * Created by Zihang Zhang on 2017/6/4.
 */

const config = require('config-lite')(__dirname).database;

const Sequelize = require('sequelize');

const sequelize = require('../libs/sequelize');

const crypto = require('crypto');

const schema = {
    username: {
        type: Sequelize.STRING(16),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(256),
        allowNull: false,
        set(val){ // 对val加密并返回加密值

            const hash = crypto.createHash('sha256');
            hash.update(config.salt + val);
            const hashedPWD = hash.digest('hex');
            this.setDataValue('password', hashedPWD.slice(0, 255));
        }
    },
    name: {
        type: Sequelize.STRING(5)
    },
    sex: {
        type: Sequelize.ENUM,
        values: ['未知', '男', '女']
    },
    // uid: { // 学号
    //     type: Sequelize.STRING(10)
    // },
    description: { // 个性签名
        type: Sequelize.TEXT('tiny')
    }
};

const options = {
    indexes: [
        {
            unique: true,
            fields: ['username']
        }
        // {
        //     unique: true,
        //     fields: ['uid']
        // }
    ]
};

const User = sequelize.define('user', schema, options);

User.sync().then();

module.exports = User;
