const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  lastName: { type: String, required: false },  
  firstName: { type: String, required: false }, 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
