const mongoose=require('mongoose')

const Schema= mongoose.Schema;

const userSchema= new Schema({
    emal:{
        type: String
        
    },
    password:{
        type: String
    },
    role:{
        type:String,
        default:'user'
    }
});


module.exports = mongoose.model('User', userSchema);