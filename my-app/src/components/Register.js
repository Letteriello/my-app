// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../firebaseConfig';
import { TextField, Button, Container, Typography, Box, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
            Register
          </Button>
        </form>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <IconButton onClick={handleGoogleLogin} color="primary">
            <GoogleIcon />
          </IconButton>
          <IconButton onClick={handleFacebookLogin} color="primary">
            <FacebookIcon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
