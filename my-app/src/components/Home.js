import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { orange, deepOrange } from '@mui/material/colors';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: orange[700],
    padding: '10px 0',
  },
  hero: {
    backgroundImage: 'url(/static/images/fitness-hero.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '100px 0',
    color: '#fff',
    textAlign: 'center',
  },
  heroContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '10px',
    display: 'inline-block',
  },
  section: {
    padding: '50px 0',
    textAlign: 'center',
  },
  card: {
    margin: '20px',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 6px 20px 0 rgba(0,0,0,0.38)',
  },
  button: {
    marginTop: '20px',
    backgroundColor: deepOrange[500],
    color: '#fff',
    '&:hover': {
      backgroundColor: deepOrange[700],
    },
  },
  joinButton: {
    marginTop: '20px',
    backgroundColor: '#ff6f00',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#e65100',
    },
  },
  premiumPlan: {
    backgroundColor: orange[50],
    padding: '20px',
    borderRadius: '15px',
    textAlign: 'center',
  },
  explorePrograms: {
    marginTop: '20px',
  },
  programCard: {
    backgroundColor: orange[100],
    padding: '20px',
    borderRadius: '15px',
  },
});

const Home = () => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  const handleClick = () => {
    console.log('Botão clicado!');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            The Fit Club
          </Typography>
        </Toolbar>
      </AppBar>

      <Box className={classes.hero}>
        <Box className={classes.heroContent}>
          <Typography variant="h2" gutterBottom>
            Shape Your Ideal Body
          </Typography>
          <Typography variant="h6" gutterBottom>
            In here we will help you to shape and build your ideal body and live up your life to fullest
          </Typography>
          <Button variant="contained" className={classes.joinButton}>
            Join Now
          </Button>
        </Box>
      </Box>

      <Container>
        <Box className={classes.section}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box className={classes.premiumPlan}>
                <Typography variant="h4" gutterBottom>
                  Premium Plan
                </Typography>
                <Typography variant="h6" gutterBottom>
                  $30
                </Typography>
                <Typography variant="body1">
                  5 hours of exercises
                </Typography>
                <Typography variant="body1">
                  Free Consultation of Coaches
                </Typography>
                <Typography variant="body1">
                  Access to minibar
                </Typography>
                <Button variant="contained" className={classes.joinButton}>
                  Join Now
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper className={classes.card}>
                <Typography variant="h4" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body1">
                  We are a fitness platform dedicated to helping you achieve your health and wellness goals. Our team of expert coaches and comprehensive fitness programs are designed to cater to all your fitness needs.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.section}>
          <Typography variant="h4" gutterBottom>
            Explore Our Programs
          </Typography>
          <Grid container spacing={3} className={classes.explorePrograms}>
            <Grid item xs={12} md={4}>
              <Paper className={classes.programCard}>
                <Typography variant="h5" gutterBottom>
                  Fat Burning
                </Typography>
                <Typography variant="body1">
                  This program is suitable for you who wants to get rid of your fat and lose their weights.
                </Typography>
                <Button variant="contained" className={classes.joinButton}>
                  Join Now
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.programCard}>
                <Typography variant="h5" gutterBottom>
                  Health Fitness
                </Typography>
                <Typography variant="body1">
                  This program is designed for those who exercise only for their body fitness not body building.
                </Typography>
                <Button variant="contained" className={classes.joinButton}>
                  Join Now
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.programCard}>
                <Typography variant="h5" gutterBottom>
                  Strength Training
                </Typography>
                <Typography variant="body1">
                  This program is for those who want to build muscle strength and increase their physical power.
                </Typography>
                <Button variant="contained" className={classes.joinButton}>
                  Join Now
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
