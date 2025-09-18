const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/exam1");
        console.log("Mongo DB Connected") 
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB;