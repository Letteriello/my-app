const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  fitnessLevel: {
    type: String,
    required: true,
  },
  goals: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
