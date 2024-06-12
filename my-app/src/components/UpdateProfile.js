// src/components/UpdateProfile.js
import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const UpdateProfile = () => {
  const [displayName, setDisplayName] = useState(auth.currentUser.displayName || '');
  const [photoURL, setPhotoURL] = useState(auth.currentUser.photoURL || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Display Name"
            margin="normal"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Photo URL"
            margin="normal"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
            Update
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateProfile;

