const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;
let collection = null;

let client = new mongo(url);
client.connect()
.then(()=>{
    db = client.db("demo");
    collection = db.collection("users");
    console.log("Connected to MongoDB");
})
.then(()=>{
    return collection.insertOne({name:"ABCD",age:34});
})
.then((result)=>{
    console.log(result);
    process.exit(0);
})
.catch((err)=>{
    console.error(err);
    process.exit(1);
})