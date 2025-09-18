const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String,required:true},
    password: {type:String,required:true},
    role:{type:String,enum:['customer','admin'],default:'customer'}
})

// userSchema.pre('save', async (next)=>{
//     console.log(next);
//     this.password = await bcrypt.hash(this.password,10)
//     next();
// })

module.exports = mongoose.model('User',userSchema);