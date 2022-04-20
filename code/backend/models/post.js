const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/db')

const post = db.define('post',{
    id_post:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    text_content:{
        type:DataTypes.STRING,
        allowNull:false
    },
    url_img_post:{
        type:DataTypes.STRING,
    },
    id_user:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports=post