const mongoose = require('mongoose')    
const User = mongoose.Schema({
    name : {
        type : String,
    },
    email : String,
    password : String,
    profile : String,
    role : {type:String,enum:['student','teacher'],default:'student'}
})
module.exports =  mongoose.model( 'User' , User)