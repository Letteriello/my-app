import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableContainer: {
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
  },
  tableHead: {
    backgroundColor: "#f5f5f5",
  },
  tableCell: {
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCellBody: {
    textAlign: "center",
  },
  sectionTitle: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "1.2rem",
    padding: "10px 0",
  },
});

const workoutSchedule = [
  {
    title: "Treino 1",
    subtitle: "Peito, Ombro, Tríceps",
    exercises: [
      { name: "Supino Reto", series: 3, repetitions: "8-12", muscle: "Peito" },
      { name: "Supino Inclinado", series: 3, repetitions: "8-12", muscle: "Peito" },
      { name: "Peck Deck", series: 3, repetitions: "8-12", muscle: "Peito" },
      { name: "Pullover", series: 3, repetitions: "8-12", muscle: "Peito" },
      { name: "Desenvolvimento com Barra", series: 3, repetitions: "8-12", muscle: "Ombro" },
      { name: "Elevação Lateral", series: 3, repetitions: "8-12", muscle: "Ombro" },
      { name: "Elevação Frontal", series: 3, repetitions: "8-12", muscle: "Ombro" },
      { name: "Tríceps Testa", series: 3, repetitions: "8-12", muscle: "Tríceps" },
      { name: "Tríceps Pulley", series: 3, repetitions: "8-12", muscle: "Tríceps" },
      { name: "Tríceps Francês", series: 3, repetitions: "8-12", muscle: "Tríceps" },
    ],
  },
  {
    title: "Treino 2",
    subtitle: "Costas, Trapézio, Bíceps",
    exercises: [
      { name: "Aquecimento Barra Fixa", series: 2, repetitions: "8-12", muscle: "Costas" },
      { name: "Puxador Costas", series: 3, repetitions: "8-12", muscle: "Costas" },
      { name: "Remada Unilateral", series: 3, repetitions: "8-12", muscle: "Costas" },
      { name: "Encolhimento Ombro", series: 3, repetitions: "8-12", muscle: "Trapézio" },
      { name: "Remada Alta", series: 3, repetitions: "8-12", muscle: "Trapézio" },
      { name: "Rosca Direta", series: 3, repetitions: "8-12", muscle: "Bíceps" },
      { name: "Rosca Concentrada", series: 3, repetitions: "8-12", muscle: "Bíceps" },
      { name: "Rosca Alternada", series: 3, repetitions: "8-12", muscle: "Bíceps" },
    ],
  },
  {
    title: "Treino 3",
    subtitle: "Pernas",
    exercises: [
      { name: "Aquecimento na Bike", series: "30 min", repetitions: "-", muscle: "Perna" },
      { name: "Cadeira Extensora", series: 3, repetitions: "8-12", muscle: "Perna" },
      { name: "Agachamento Hack", series: 3, repetitions: "8-12", muscle: "Perna" },
      { name: "Stiff", series: 3, repetitions: "8-12", muscle: "Perna" },
      { name: "Cama Flexora", series: 3, repetitions: "8-12", muscle: "Perna" },
      { name: "Leg 45", series: 3, repetitions: "8-12", muscle: "Perna" },
      { name: "Gêmeos Plantar", series: 3, repetitions: "8-12", muscle: "Perna" },
      { name: "Gêmeos Sentado", series: 3, repetitions: "8-12", muscle: "Perna" },
    ],
  },
];

function WorkoutSchedule() {
  const classes = useStyles();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={10}>
            <Card>
              <CardHeader title="Planilha de Treino" titleTypographyProps={{ align: 'center', variant: 'h4' }} sx={{ backgroundColor: 'primary.main', color: 'white', py: 2 }} />
              <CardContent>
                {workoutSchedule.map((workout, index) => (
                  <MDBox key={index} mb={3}>
                    <Typography variant="h6" align="center" gutterBottom>
                      {workout.title} - {workout.subtitle}
                    </Typography>
                    <TableContainer component={Paper} className={classes.tableContainer}>
                      <Table>
                        <TableHead className={classes.tableHead}>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Exercícios</TableCell>
                            <TableCell className={classes.tableCell}>Séries</TableCell>
                            <TableCell className={classes.tableCell}>Repetições</TableCell>
                            <TableCell className={classes.tableCell}>Trabalha</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {workout.exercises.map((exercise, idx) => (
                            <TableRow key={idx}>
                              <TableCell className={classes.tableCellBody}>{exercise.name}</TableCell>
                              <TableCell className={classes.tableCellBody}>{exercise.series}</TableCell>
                              <TableCell className={classes.tableCellBody}>{exercise.repetitions}</TableCell>
                              <TableCell className={classes.tableCellBody}>{exercise.muscle}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </MDBox>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default WorkoutSchedule;
