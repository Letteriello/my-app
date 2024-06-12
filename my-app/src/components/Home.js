import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
  },
  button: {
    marginTop: '20px',
  },
});

const Home = () => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessage = () => {
    setLoading(true);
    setError(null);

    fetch('/api/hello')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching message:', error);
        setError('Error fetching message. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <Container className={classes.container}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Typography variant="h4" gutterBottom>
          {message}
        </Typography>
      )}
      <Button variant="contained" color="primary" className={classes.button} onClick={fetchMessage}>
        Recarregar Mensagem
      </Button>
    </Container>
  );
};

export default Home;
