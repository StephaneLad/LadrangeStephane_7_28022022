const express = require('express')
const sequelize = require('./db/DB')
const db= require('./db/DB')
const userRoute =require('./routes/users')
const routetesss =require('./routes/Post')

const path = require('path')

db.sync()
.then(console.log('conecter'))
.catch(err=>console.log(err))



const app =express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
})

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api',userRoute)
app.use('/api/post/',routetesss)

module.exports = app