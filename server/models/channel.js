const mongoose=require('mongoose');

const channel=new mongoose.Schema({

    id: Number,
    name: String,
});

const Channel=mongoose.model('channel',channel);

module.exports={Channel}