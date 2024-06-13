import Grid from "@mui/material/Grid";
// Remove the unused import statement for Avatar
// import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

// Data
import reportsBarChartData from "layouts/overview/data/reportsBarChartData";
import reportsLineChartData from "layouts/overview/data/reportsLineChartData";

function DashboardOverview() {
  const { sales } = reportsLineChartData;
  const recentActivities = [
    "Atividade 1: Treino de força",
    "Atividade 2: Corrida de 5km",
    "Atividade 3: Sessão de Yoga",
  ];

  const goals = [
    { goal: "Perder 5kg", progress: "60%" },
    { goal: "Correr 10km", progress: "40%" },
    { goal: "Aumentar massa muscular", progress: "70%" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Visão Geral
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <ComplexStatisticsCard
              color="success"
              icon="show_chart"
              title="Metas Concluídas"
              count="5"
              percentage={{
                color: "success",
                amount: "+15%",
                label: "do último mês",
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ComplexStatisticsCard
              color="info"
              icon="trending_up"
              title="Progresso Geral"
              count="75%"
              percentage={{
                color: "info",
                amount: "+10%",
                label: "do último mês",
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ComplexStatisticsCard
              color="warning"
              icon="update"
              title="Atividades Recentes"
              count="8"
              percentage={{
                color: "warning",
                amount: "-5%",
                label: "do último mês",
              }}
            />
          </Grid>
        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Resumo das Atividades Recentes
                  </Typography>
                  {recentActivities.map((activity, index) => (
                    <Typography key={index} variant="body2" color="textSecondary">
                      {activity}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Metas e Progresso
                  </Typography>
                  {goals.map((goal, index) => (
                    <Typography key={index} variant="body2" color="textSecondary">
                      {goal.goal}: {goal.progress}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ReportsBarChart
                color="info"
                title="Progresso das Metas"
                description="Progresso das metas estabelecidas"
                date="Atualizado recentemente"
                chart={reportsBarChartData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ReportsLineChart
                color="success"
                title="Atividades Recentes"
                description="Resumo das atividades recentes"
                date="Atualizado recentemente"
                chart={sales}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DashboardOverview;
