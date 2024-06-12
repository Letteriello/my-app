import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography } from '@mui/material';

const TdeCalculator = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    activity_level: '',
    gender: 'male'
  });
  const [tde, setTde] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/calculate_tde', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => setTde(data.tde));
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Height (cm)"
          name="height"
          value={formData.height}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Weight (kg)"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          select
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
        <TextField
          label="Activity Level"
          name="activity_level"
          value={formData.activity_level}
          onChange={handleChange}
          select
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="sedentary">Sedentary</MenuItem>
          <MenuItem value="lightly active">Lightly Active</MenuItem>
          <MenuItem value="moderately active">Moderately Active</MenuItem>
          <MenuItem value="very active">Very Active</MenuItem>
          <MenuItem value="extra active">Extra Active</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Calculate TDE
        </Button>
      </form>
      {tde && (
        <Typography variant="h6" margin="normal">
          Your Total Daily Energy Expenditure (TDE) is: {tde} kcal
        </Typography>
      )}
    </Container>
  );
};

export default TdeCalculator;
