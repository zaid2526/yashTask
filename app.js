require('dotenv').config()
const express=require('express')
const bcrypt=require('bcrypt')

const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')

const mongoose =require('mongoose')
const User=require('./models/user.js')

const bookRoutes = require('./routes/book.router');
const authRoutes = require('./routes/auth.router');


const app=express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static('./images'))

app.use('/book',bookRoutes)
app.use(authRoutes);

app.use('/',(req,res)=>{
    res.send("server running on 8000")
})

// const  crypto=require('crypto')
// const secretKey=crypto.randomBytes(64).toString('hex');
// console.log('secret',secretKey);

mongoose
    .connect('mongodb+srv://Atlas_admin:admin@yashtaskcrud.646sx4n.mongodb.net/?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(async (user)=>{
          if(!user){
            let encryptPassword=await bcrypt.hash('admin', 10);
            const user=new User({
              email:'test@gmail.com',
              password:encryptPassword
            })
            user.save();
          }
        })
        app.listen(8000);
      })
    .catch(err=>console.log(err))

