import React from 'react';
import { Container, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/system';
import useFetchMessage from '../hooks/useFetchMessage';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  textAlign: 'center',
});

const StyledButton = styled(Button)({
  marginTop: '20px',
});

const Home: React.FC = () => {
  const { message, loading, error, fetchMessage } = useFetchMessage();

  return (
    <StyledContainer>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Typography variant="h4" gutterBottom>
          {message}
        </Typography>
      )}
      <StyledButton variant="contained" color="primary" onClick={fetchMessage}>
        Recarregar Mensagem
      </StyledButton>
    </StyledContainer>
  );
};

export default Home;
