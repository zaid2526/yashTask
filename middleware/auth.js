const jwt=require('jsonwebtoken');

const User=require('../models/user');


exports.auth=(req,res,next)=>{
    try{
        var token = req.headers['x-access-token'];
        // console.log(">>>>>>>>>",token);
        // const token=req.cookies.jwt
        // console.log("token from cookie",req.cookies)
        const verifyUser=jwt.verify(token,process.env.SECRET_KEY)
        console.log("verifyUser",verifyUser);
        if(verifyUser.role==='admin'){
            User.findOne({where:{email:verifyUser.email}})
            .then(user=>{
                req.user=user;
                next();
            })
        }else{
            return res.json({msg:'yor are not admin'})
        }
        
            
    }catch(err){
        res.status(401).send(err)
    }
    
}