const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  dateOfBirth: Date,
  phone: String,
  height: String,
  weight: String,
  dietaryRestrictions: String,
  allergies: String,
  chronicDiseases: String,
  medications: String
});

module.exports = mongoose.model('User', UserSchema);
