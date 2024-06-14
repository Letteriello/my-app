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

  const fetchMealHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/nutrition/meal_history');
      setMealHistory(response.data.mealHistory);
    } catch (error) {
      console.error("There was an error fetching the meal history!", error);
    }
  };

  const fetchNutritionPlan = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/nutrition/nutrition_plan');
      setNutritionPlan(response.data.nutritionPlan);
    } catch (error) {
      console.error("There was an error fetching the nutrition plan!", error);
    }
  };

  useEffect(() => {
    fetchMealHistory();
    fetchNutritionPlan();
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
                  Recomendações Nutricionais
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={2} px={2}>
                <Button variant="contained" color="primary" onClick={getRecommendation}>
                  Obter Recomendações
                </Button>
                {recommendation && (
                  <MDBox mt={3}>
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
                  Histórico de Refeições
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={2} px={2}>
                <ul>
                  {mealHistory.map((meal, index) => (
                    <li key={index}>
                      <MDTypography>{meal}</MDTypography>
                    </li>
                  ))}
                </ul>
              </MDBox>
            </Card>
          </Grid>

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
                  Plano Nutricional
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={2} px={2}>
                <ul>
                  {nutritionPlan.map((plan, index) => (
                    <li key={index}>
                      <MDTypography>{plan}</MDTypography>
                    </li>
                  ))}
                </ul>
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
