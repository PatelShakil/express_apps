const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/exam2", { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected...'))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}` ))