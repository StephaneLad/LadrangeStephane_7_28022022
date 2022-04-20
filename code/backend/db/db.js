const { Model } = require('sequelize');
const Sequelize = require('sequelize')
require('dotenv').config()
const sequelize =  new Sequelize(process.env.DataBase, process.env.user, process.env.password, {host: 'localhost',dialect: 'mysql'});
module.exports = sequelize