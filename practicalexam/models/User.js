const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  hobbies: { type: [String] },
  field: { type: String, required: true },
  password: { type: String, required: true },
});

const User=mongoose.model("User", userSchema);
//or also write like this mongoose.mode("User",userSchema,"users") here users is a table name that automaticaly
//write by database

module.exports =User; 
