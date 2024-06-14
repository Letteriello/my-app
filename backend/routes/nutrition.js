const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/create_user', async (req, res) => {
  const { name, email, address, dateOfBirth, phone, height, weight, dietaryRestrictions, allergies, chronicDiseases, medications } = req.body;
  console.log('Received data:', req.body);

  try {
    const newUser = new User({ name, email, address, dateOfBirth, phone, height, weight, dietaryRestrictions, allergies, chronicDiseases, medications });
    await newUser.save();
    console.log('User saved:', newUser);
    res.json(newUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
