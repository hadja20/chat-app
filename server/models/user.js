const mongoose=require('mongoose');

const user = new mongoose.Schema({
    id:Number,
    username: String,
    password:String
});

const User=mongoose.model('User',user);

module.exports=User