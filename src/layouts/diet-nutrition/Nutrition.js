import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const Nutrition = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [mealHistory, setMealHistory] = useState([]);
  const [nutritionPlan, setNutritionPlan] = useState([]);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  const getRecommendation = async () => {
    const userId = "USER_ID_AQUI"; // Substitua pelo ID do usuário
    try {
      const response = await axios.post('http://localhost:5000/api/nutrition/recommend_diet', { userId });
      setRecommendation(response.data.recommendation);
    } catch (error) {
      console.error("There was an error fetching the recommendation!", error);
    }
  };

  useEffect(() => {
    // Aqui você pode fazer chamadas para buscar o histórico de refeições e planos alimentares
    // setMealHistory(dadosDoHistorico);
    // setNutritionPlan(dadosDoPlano);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
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
                  Planos Alimentares
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {nutritionPlan.map((plan, index) => (
                  <MDTypography key={index} variant="body2" color="textSecondary">
                    {plan}
                  </MDTypography>
                ))}
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
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
                  Histórico de Refeições
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {mealHistory.map((meal, index) => (
                  <MDTypography key={index} variant="body2" color="textSecondary">
                    {meal}
                  </MDTypography>
                ))}
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
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
                  Recomendação de Dietas
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Button variant="contained" color="primary" onClick={getRecommendation}>
                  Obter Recomendação
                </Button>
                {recommendation && (
                  <MDBox mt={2}>
                    <MDTypography>Calorias: {recommendation.calories}</MDTypography>
                    <MDTypography>Proteínas: {recommendation.protein}g</MDTypography>
                    <MDTypography>Carboidratos: {recommendation.carbs}g</MDTypography>
                    <MDTypography>Gorduras: {recommendation.fats}g</MDTypography>
                  </MDBox>
                )}
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
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
                  Calculadora de Calorias e Nutrientes
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <TextField
                  label="Calorias"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Proteínas (g)"
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Carboidratos (g)"
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Gorduras (g)"
                  type="number"
                  value={fats}
                  onChange={(e) => setFats(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Nutrition;
