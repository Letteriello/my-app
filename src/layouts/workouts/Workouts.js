import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const useStyles = makeStyles({
  event: {
    backgroundColor: '#3f51b5',
    color: 'white',
    borderRadius: '8px',
    padding: '5px',
    '&:hover': {
      backgroundColor: '#303f9f',
      cursor: 'pointer',
    },
  },
  calendarToolbar: {
    backgroundColor: '#3f51b5',
    color: 'white',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  calendarEvent: {
    backgroundColor: '#f50057',
    color: 'white',
    borderRadius: '5px',
    padding: '4px',
  },
});

function Event({ event }) {
  const classes = useStyles();
  return (
    <Tooltip title={event.title}>
      <span className={classes.event}>{event.title}</span>
    </Tooltip>
  );
}

function Workouts() {
  const classes = useStyles();
  
  const workoutPlans = [
    { name: "Plano de Treino A", description: "Descrição do Plano de Treino A" },
    { name: "Plano de Treino B", description: "Descrição do Plano de Treino B" },
  ];

  const workoutHistory = [
    "Treino 1: 10/01/2024",
    "Treino 2: 12/01/2024",
    "Treino 3: 15/01/2024",
  ];

  const recommendedWorkouts = [
    "Treino Recomendado 1",
    "Treino Recomendado 2",
    "Treino Recomendado 3",
  ];

  const events = [
    {
      title: 'Treino de Corrida',
      start: new Date(2024, 0, 10, 7, 0),
      end: new Date(2024, 0, 10, 8, 0),
    },
    {
      title: 'Treino de Força',
      start: new Date(2024, 0, 12, 17, 0),
      end: new Date(2024, 0, 12, 18, 0),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Treinos
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Planos de Treino
                  </Typography>
                  {workoutPlans.map((plan, index) => (
                    <Typography key={index} variant="body2" color="textSecondary">
                      {plan.name}: {plan.description}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Histórico de Treinos
                  </Typography>
                  {workoutHistory.map((history, index) => (
                    <Typography key={index} variant="body2" color="textSecondary">
                      {history}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Treinos Recomendados
                  </Typography>
                  {recommendedWorkouts.map((workout, index) => (
                    <Typography key={index} variant="body2" color="textSecondary">
                      {workout}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </MDBox>
          </Grid>

          <Grid item xs={12}>
            <MDBox mb={1.5}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Calendário de Treinos
                  </Typography>
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    views={['week']}
                    defaultView='week'
                    components={{
                      event: Event,
                      toolbar: (props) => (
                        <div className={classes.calendarToolbar}>
                          {props.label}
                        </div>
                      ),
                    }}
                  />
                </CardContent>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Workouts;
