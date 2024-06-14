import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

function Dashboard() {
  const user = {
    fullName: "Gabriel Letteriello",
    email: "gabriel.letteriello.ai@gmail.com",
    address: "Rua Porto Novo, 286, Campo Grande - MS",
    dateOfBirth: "1995-10-31",
    phone: "+55 67 99332-5366",
    profilePicture: "https://via.placeholder.com/150",
    height: "185 cm",
    weight: "98 kg",
    dietaryRestrictions: "Nenhuma",
    allergies: "Nenhuma"
  };

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [phone, setPhone] = useState(user.phone);
  const [height, setHeight] = useState(user.height);
  const [weight, setWeight] = useState(user.weight);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(user.dietaryRestrictions);
  const [allergies, setAllergies] = useState(user.allergies);
  const [chronicDiseases, setChronicDiseases] = useState("Nenhuma");
  const [medications, setMedications] = useState("Nenhum");

  const handleSaveProfile = async () => {
    console.log('Saving user profile...');
    const userData = {
      name: fullName,
      email,
      address,
      dateOfBirth,
      phone,
      height,
      weight,
      dietaryRestrictions,
      allergies,
      chronicDiseases,
      medications
    };
    console.log('User data:', userData);

    try {
      const response = await axios.post('http://localhost:5000/api/nutrition/create_user', userData);
      console.log('User profile saved:', response.data);
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Endereço"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Data de Nascimento"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Telefone"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBox mt={2}>
                <Button variant="contained" color="primary" onClick={handleSaveProfile}>Salvar Alterações</Button>
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
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Peso"
                variant="outlined"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Restrições Alimentares"
                variant="outlined"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Alergias"
                variant="outlined"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Doenças Crônicas"
                variant="outlined"
                value={chronicDiseases}
                onChange={(e) => setChronicDiseases(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Medicamentos em Uso"
                variant="outlined"
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
              />
              <MDBox mt={2}>
                <Button variant="contained" color="primary" onClick={handleSaveProfile}>Atualizar Informações de Saúde</Button>
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
