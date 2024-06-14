const express = require('express');
const { generateWorkoutController } = require('../controllers/workoutController');

const router = express.Router();

router.post('/generate-workout', generateWorkoutController);

module.exports = router;
