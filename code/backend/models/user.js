const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/db')

const user = db.define('users', {
    id_user:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    user_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    is_admin:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }
})

module.exports= user