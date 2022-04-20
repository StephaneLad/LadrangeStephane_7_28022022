const userModel = require('../models/user')
const sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup=(req,res)=>{
    const dataName = req.body.email.split('@')
    const user_name = dataName[0]
    bcrypt.hash(req.body.password, 10)
    .then(hash=>{
        userModel.create({
            id_user:0,
            user_name:user_name,
            email:req.body.email,
            password:hash
        })
        .then(()=>
            userModel.findOne({where:{email:`${req.body.email}`}}))
            .then(user=>{
                res.status(200).json({
                    userId:user.id_user,
                    token: jwt.sign(
                        {userId:user.id_user},
                        "clef",
                        {expiresIn:'24h'}
                    ),
                    is_admin:false
                })
            })
            .catch(err=>console.log(err))
        .catch(err=>console.log(err))
    })
    
}
exports.login=(req,res)=>{
    userModel.findOne({where:{email:`${req.body.email}`}})
    .then(user=>{
        if(user===null){
            res.status(404).json({message:'user not fund'})
        }else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid=>{
                if(valid !== true){
                    res.status(400).json({message:'invalid password'})
                }
                if(user.is_admin===1){
                    res.status(200).json({
                        userId:user.id_user,
                        token: jwt.sign(
                            {userId:user.id_user},
                            "clef",
                            {expiresIn:'24h'}
                        ),
                        is_admin:true
                    })  
                }else{
                    res.status(200).json({
                        userId:user.id_user,
                        token: jwt.sign(
                            {userId:user.id_user},
                            "clef",
                            {expiresIn:'24h'}
                        ),
                        is_admin:false
                    })
                }
            })
            .catch(err=>console.log(err))
        }
        
    })
}

exports.update=(req,res)=>{
    let data=req.body
    let email = data.email
    let user_name = data.user_name
    let password = data.password
    userModel.findOne({where :{id_user:`${data.id_user}`}})
    .then(user=>{
        if(!user){return res.status(400).json({message:'user not fund'})}
        if(email.length>=5){
            user.email=email
        }
        if(user_name.length>=5){
            user.user_name=user_name
        }
        if(password.length>=5){
            bcrypt.hash(password,10)
            .then(hash=>{
                user.password=hash
            })            
        }
        user.save()
        .then(res.status(200).json({message:'user update'}))
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}

exports.delete=(req,res)=>{
    userModel.destroy({where:{id_user:`${req.body.id_user}`}})
    .then(res.status(200).json({message:'user delete'}))
    .catch(err=>console.log(err))
}













