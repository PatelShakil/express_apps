const mangoose = require('mongoose');
const url = 'mongodb://localhost:27017/demo';
mangoose.connect(url);
const db = mangoose.connection;


db.on("error",(e)=>{
    console.error(e);
})

db.on("open",()=>{
    console.log("Connected to MongoDB using Mangoose");


    var UserSchema = mangoose.Schema({
        name:"String",
        age: "Number"
    })

    var User = mangoose.model("User",UserSchema,"users");

    var user = new User({name:"Someone",age:40});

    user.save()
    .then((result)=>{
        console.log(result);
        process.exit(0);
    })
    .catch(er=>{
        console.error(er);
        process.exit(1);
    })
})