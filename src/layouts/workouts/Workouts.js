import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';

function Workouts() {
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
                  <WeekCalendar
                    startTime={new Date(2023, 9, 1, 8, 0, 0)}
                    endTime={new Date(2023, 9, 1, 20, 0, 0)}
                    numberOfDays={7}
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
