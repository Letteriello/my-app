import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

const workoutSchedule = [
  {
    title: "Treino 1 - Peito, Ombro, Tríceps",
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
    title: "Treino 2 - Costas, Trapézio, Bíceps",
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
    title: "Treino 3 - Pernas",
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
  const createTableData = () => {
    let tableData = [];
    workoutSchedule.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        tableData.push({
          Treino: workout.title,
          Exercício: exercise.name,
          Séries: exercise.series,
          Repetições: exercise.repetitions,
          Trabalha: exercise.muscle,
        });
      });
    });
    return tableData;
  };

  const columns = [
    { Header: "Treino", accessor: "Treino" },
    { Header: "Exercício", accessor: "Exercício" },
    { Header: "Séries", accessor: "Séries" },
    { Header: "Repetições", accessor: "Repetições" },
    { Header: "Trabalha", accessor: "Trabalha" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Planilha de Treino
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: createTableData() }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default WorkoutSchedule;
