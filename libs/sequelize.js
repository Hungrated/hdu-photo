/**
 * Created by Zihang Zhang on 2017/6/4.
 */

const Sequelize = require('sequelize');
const config = require('config-lite')(__dirname).database;


const sequelize = new Sequelize(config.dbName, config.username, config.password, {
    host: 'localhost',
    dialect: 'mysql',
    //dialectModulePath: 'mysql2',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }

});

module.exports = sequelize;
