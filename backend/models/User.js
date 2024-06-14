const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  dateOfBirth: {
    type: Date,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  height: {
    type: String,
    required: false
  },
  weight: {
    type: String,
    required: false
  },
  dietaryRestrictions: {
    type: String,
    required: false
  },
  allergies: {
    type: String,
    required: false
  },
  chronicDiseases: {
    type: String,
    required: false
  },
  medications: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
