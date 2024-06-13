import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Dashboard() {
  const user = {
    fullName: "Gabriel Letteriello",
    email: "gabriel.letteriello.ai@gmail.com",
    address: "Rua Porto Novo, 286, Campo Grande - MS",
    dateOfBirth: "1995-10-31",
    phone: "+55 67 99332-5366",
    profilePicture: "https://via.placeholder.com/150", // Substitua pelo caminho correto da imagem
    height: "185 cm",
    weight: "98 kg",
    dietaryRestrictions: "Nenhuma",
    allergies: "Nenhuma"
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <MDBox mb={1.5} display="flex" justifyContent="center">
              <Avatar src={user.profilePicture} alt={user.fullName} sx={{ width: 120, height: 120 }} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <MDBox mb={1.5}>
              <h1>{user.fullName}</h1>
              <TextField
                fullWidth
                margin="normal"
                label="Nome Completo"
                variant="outlined"
                defaultValue={user.fullName}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Endereço"
                variant="outlined"
                defaultValue={user.address}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Data de Nascimento"
                type="date"
                InputLabelProps={{ shrink: true }}
                defaultValue={user.dateOfBirth}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Telefone"
                variant="outlined"
                defaultValue={user.phone}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                variant="outlined"
                defaultValue={user.email}
              />
              <MDBox mt={2}>
                <Button variant="contained" color="primary">Salvar Alterações</Button>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>Dados de Saúde</h2>
              <TextField
                fullWidth
                margin="normal"
                label="Altura"
                variant="outlined"
                defaultValue={user.height}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Peso"
                variant="outlined"
                defaultValue={user.weight}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Restrições Alimentares"
                variant="outlined"
                defaultValue={user.dietaryRestrictions}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Alergias"
                variant="outlined"
                defaultValue={user.allergies}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Doenças Crônicas"
                variant="outlined"
                defaultValue="Nenhuma"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Medicamentos em Uso"
                variant="outlined"
                defaultValue="Nenhum"
              />
              <MDBox mt={2}>
                <Button variant="contained" color="primary">Atualizar Informações de Saúde</Button>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
