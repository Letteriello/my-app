import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton, AppBar, Toolbar, CssBaseline, Avatar, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import UpdateProfile from './UpdateProfile';
import Tasks from './Tasks';

const data = [
  { name: 'Aug 25', uv: 60, pv: 40 },
  { name: 'Aug 26', uv: 65, pv: 55 },
  { name: 'Aug 27', uv: 70, pv: 60 },
  { name: 'Aug 28', uv: 80, pv: 70 },
  { name: 'Aug 29', uv: 85, pv: 75 },
  { name: 'Aug 30', uv: 90, pv: 80 },
  { name: 'Aug 31', uv: 95, pv: 85 },
];

const activities = [
  { id: 1, activity: 'Morning Walk', duration: '30 mins', calories: 150 },
  { id: 2, activity: 'Yoga', duration: '45 mins', calories: 200 },
  { id: 3, activity: 'Cycling', duration: '60 mins', calories: 400 },
  { id: 4, activity: 'Gym', duration: '90 mins', calories: 600 },
];

const activityDistribution = [
  { name: 'Walk', value: 400 },
  { name: 'Run', value: 300 },
  { name: 'Bike', value: 300 },
  { name: 'Swim', value: 200 },
];

const healthAnalysis = [
  { subject: 'Cardio', A: 120, fullMark: 150 },
  { subject: 'Strength', A: 98, fullMark: 150 },
  { subject: 'Flexibility', A: 86, fullMark: 150 },
  { subject: 'Endurance', A: 99, fullMark: 150 },
  { subject: 'Speed', A: 85, fullMark: 150 },
  { subject: 'Balance', A: 65, fullMark: 150 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const drawerWidth = 280;

const Sidebar = ({ mobileOpen, handleDrawerToggle, navigate, user }) => (
  <Drawer
    variant="temporary"
    open={mobileOpen}
    onClose={handleDrawerToggle}
    ModalProps={{
      keepMounted: true,
    }}
    sx={{
      display: { xs: 'block', sm: 'none' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#1976d2', color: '#ffffff' },
    }}
  >
    <List>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src={user?.photoURL || "https://via.placeholder.com/150"} sx={{ width: 80, height: 80, mb: 2 }} />
        <Typography variant="h6" color="white">{user?.displayName || "John Watson"}</Typography>
        <Typography variant="body2" color="white">{user?.email || "example@example.com"}</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <ListItem button onClick={() => navigate('/')} key="home">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => navigate('/dashboard')} key="dashboard">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <FitnessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => navigate('/register')} key="register">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <DirectionsRunIcon />
        </ListItemIcon>
        <ListItemText primary="Register" />
      </ListItem>
      <ListItem button onClick={() => navigate('/login')} key="login">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
      <ListItem button onClick={() => navigate('/update-profile')} key="update-profile">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Update Profile" />
      </ListItem>
      <ListItem button onClick={() => navigate('/tasks')} key="tasks">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItem>
      <ListItem button onClick={() => {
        signOut(auth).then(() => navigate('/login'));
      }} key="logout">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  </Drawer>
);

const PermanentSidebar = ({ open, handleDrawerToggle, navigate, user }) => (
  <Drawer
    variant="persistent"
    open={open}
    sx={{
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#1976d2', color: '#ffffff' },
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '8px',
      }}
    >
      <IconButton onClick={handleDrawerToggle}>
        <ChevronLeftIcon sx={{ color: '#ffffff' }} />
      </IconButton>
    </Box>
    <Divider sx={{ my: 1 }} />
    <List>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src={user?.photoURL || "https://via.placeholder.com/150"} sx={{ width: 80, height: 80, mb: 2 }} />
        <Typography variant="h6" color="white">{user?.displayName || "John Watson"}</Typography>
        <Typography variant="body2" color="white">{user?.email || "example@example.com"}</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <ListItem button onClick={() => navigate('/')} key="home">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => navigate('/dashboard')} key="dashboard">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <FitnessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => navigate('/register')} key="register">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <DirectionsRunIcon />
        </ListItemIcon>
        <ListItemText primary="Register" />
      </ListItem>
      <ListItem button onClick={() => navigate('/login')} key="login">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
      <ListItem button onClick={() => navigate('/update-profile')} key="update-profile">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Update Profile" />
      </ListItem>
      <ListItem button onClick={() => navigate('/tasks')} key="tasks">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItem>
      <ListItem button onClick={() => {
        signOut(auth).then(() => navigate('/login'));
      }} key="logout">
        <ListItemIcon sx={{ color: '#ffffff' }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  </Drawer>
);

const StyledCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: '#ffffff',
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  marginBottom: theme.spacing(2),
}));

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notifications'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const notification = change.doc.data();
          toast(notification.message);
        }
      });
    });

    return () => unsubscribe();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar mobileOpen={!drawerOpen} handleDrawerToggle={handleDrawerToggle} navigate={navigate} user={user} />
      <PermanentSidebar open={drawerOpen} handleDrawerToggle={handleDrawerToggle} navigate={navigate} user={user} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/" element={
              <Grid container spacing={3}>
                {/* Cards */}
                <Grid item xs={12} sm={6} md={3}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        95 bpm
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Heart Rate
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        2064
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Steps
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        1131 kcal
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Calories
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        5h 3m
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Sleep
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>

                {/* Line Chart */}
                <Grid item xs={12}>
                  <Item>
                    <Typography variant="h6" gutterBottom>
                      Activity Statistics
                    </Typography>
                    <Box sx={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={data}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="pv" stroke="#ff7300" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="uv" stroke="#387908" />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </Item>
                </Grid>

                {/* Bar Chart */}
                <Grid item xs={12}>
                  <Item>
                    <Typography variant="h6" gutterBottom>
                      Calorie Burn Statistics
                    </Typography>
                    <Box sx={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={data}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="uv" fill="#8884d8" />
                          <Bar dataKey="pv" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Item>
                </Grid>

                {/* Area Chart */}
                <Grid item xs={12}>
                  <Item>
                    <Typography variant="h6" gutterBottom>
                      Sleep Statistics
                    </Typography>
                    <Box sx={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={data}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Box>
                  </Item>
                </Grid>

                {/* Pie Chart */}
                <Grid item xs={12} md={6}>
                  <Item>
                    <Typography variant="h6" gutterBottom>
                      Activity Distribution
                    </Typography>
                    <Box sx={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={activityDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {activityDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </Item>
                </Grid>

                {/* Radar Chart */}
                <Grid item xs={12} md={6}>
                  <Item>
                    <Typography variant="h6" gutterBottom>
                      Health Analysis
                    </Typography>
                    <Box sx={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={healthAnalysis}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis />
                          <Radar name="Health" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Item>
                </Grid>

                {/* Date Picker */}
                <Grid item xs={12}>
                  <Item>
                    <Typography variant="h6" gutterBottom>
                      Filter Activities by Date
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Select Date"
                        value={selectedDate}
                        onChange={(newValue) => {
                          setSelectedDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Item>
                </Grid>

                {/* Activities Table */}
                <Grid item xs={12}>
                  <Item>
                    <Typography variant="h6" gutterBottom>
                      Recent Activities
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Activity</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Calories</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((activity) => (
                            <TableRow key={activity.id}>
                              <TableCell>{activity.activity}</TableCell>
                              <TableCell>{activity.duration}</TableCell>
                              <TableCell>{activity.calories}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={activities.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Item>
                </Grid>

                {/* Journals */}
                <Grid item xs={12} md={4}>
                  <Item>
                    <Typography variant="h6" gutterBottom>
                      Journals
                    </Typography>
                    <Typography variant="body1">Morning Walk: 30 mins</Typography>
                    <Typography variant="body1">Water Taken: 4 Glasses</Typography>
                    <Typography variant="body1">Breakfast: Milk, Bread, Banana</Typography>
                    <Typography variant="body1">Snack: Biscuits, Apple, Peas</Typography>
                  </Item>
                </Grid>
              </Grid>
            } />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
