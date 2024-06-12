import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const UserDataForm = ({ onSubmit }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ height, weight, age, activityLevel });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Personal Data
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Height (cm)"
            margin="normal"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Weight (kg)"
            margin="normal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Age"
            margin="normal"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Activity Level"
            margin="normal"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserDataForm;
