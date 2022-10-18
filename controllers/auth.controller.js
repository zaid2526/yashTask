const User = require('../models/user')

const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken')


exports.postLogIn=(req,res,next)=>{
    const { email, password,role}=req.body;
    
    let token;
    let id;
    
    // console.log("postLogIn",req.body);
    User.findOne({email:email})
        // .exec()
        .then(data=>{
            console.log("data",data);
            if(!data){
                res.json({email:email,auth:false})
            }else{
                id=data.id;
                return bcrypt.compare(password,data.password)
            }
            
        })
        .then(validPassword=>{
            if(validPassword===true){
                console.log("valid",validPassword);
                token=jwt.sign({email:email,role:role},process.env.SECRET_KEY,{
                    expiresIn:6000
                })
                res.cookie('jwt',token,{
                    // expires: new Date(Date.now() + 30000),
                    httpOnly:true,
                    secure:true
                })
                
                res.json({
                    email:email,
                    auth:true,
                    accessToken:token
                })
            }
            if(validPassword===false){
                res.json({
                    email:email,
                    auth:false,
                })
            }
        })
        .catch(err=>{console.log(err);})
}

exports.getLogOut=(req,res,next)=>{
    // console.log("user in middleware",req.user);
    // res.clearCookie('x-access-token');
    
    res.json({jwt:"false"})
}