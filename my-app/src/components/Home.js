import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {message || 'Loading...'}
      </Typography>
    </Container>
  );
};

export default Home;

