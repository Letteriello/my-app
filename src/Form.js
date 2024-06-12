import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { messaging } from './firebase';
import {
  Container, TextField, Button, MenuItem, Typography, Box, Paper, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Line } from 'react-chartjs-2';

function Form() {
  const { t } = useTranslation();
  const [recomendacoes, setRecomendacoes] = useState(null);
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [historicoPeso, setHistoricoPeso] = useState([]);
  const [metas, setMetas] = useState([]);
  const [openMetaDialog, setOpenMetaDialog] = useState(false);

  const validationSchema = Yup.object({
    nome: Yup.string().required(t('name')),
    telefone: Yup.string().required(t('phone')),
    idade: Yup.number().required(t('age')).min(1, t('age')),
    altura: Yup.number().required(t('height')).min(1, t('height')),
    peso: Yup.number().required(t('weight')).min(1, t('weight')),
    genero: Yup.string().required(t('gender')),
    objetivo: Yup.string().required(t('goal')),
    nivel_atividade: Yup.string().required(t('activity_level')),
    email: Yup.string().email(t('email')).required(t('email')),
    senha: Yup.string().required(t('password')),
    historico_saude: Yup.string(),
    preferencias_alimentares: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      nome: '',
      telefone: '',
      idade: '',
      altura: '',
      peso: '',
      genero: '',
      objetivo: '',
      nivel_atividade: '',
      email: '',
      senha: '',
      historico_saude: '',
      preferencias_alimentares: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        toast.success(data.mensagem);
      } else {
        toast.error(data.mensagem || 'Erro ao registrar');
      }
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: emailLogin, senha: senhaLogin })
    });
    const data = await response.json();
    setIsLoading(false);
    if (response.ok) {
      setToken(data.access_token);
      toast.success('Login realizado com sucesso!');
    } else {
      toast.error(data.mensagem || 'Erro ao fazer login');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setRecomendacoes(null);
    setIsEditing(false);
    formik.resetForm();
    toast.success('Logout realizado com sucesso!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const endpoint = isEditing ? 'atualizar_usuario' : 'adicionar_usuario';
    const response = await fetch(`http://localhost:5000/${endpoint}`, {
      method: isEditing ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formik.values)
    });
    const data = await response.json();
    setIsLoading(false);
    if (response.ok) {
      toast.success(data.mensagem);
      const userResponse = await fetch('http://localhost:5000/recomendacao', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = await userResponse.json();
      setRecomendacoes(userData);
      setHistoricoPeso([...historicoPeso, { data: new Date().toLocaleDateString(), peso: formik.values.peso }]);
    } else {
      toast.error(data.mensagem || 'Erro ao enviar dados');
    }
  };

  const fetchMetas = useCallback(async () => {
    const response = await fetch('http://localhost:5000/obter_metas', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    setMetas(data);
  }, [token]);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        setIsLoading(true);
        const userResponse = await fetch('http://localhost:5000/recomendacao', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = await userResponse.json();
        setIsLoading(false);
        formik.setValues({
          nome: userData.nome,
          telefone: userData.telefone,
          idade: userData.idade,
          altura: userData.altura,
          peso: userData.peso,
          genero: userData.genero,
          objetivo: userData.objetivo,
          nivel_atividade: userData.nivel_atividade,
          email: userData.email,
          senha: '',
          historico_saude: userData.historico_saude,
          preferencias_alimentares: userData.preferencias_alimentares
        });
        setIsEditing(true);
        fetchMetas();
      };
      fetchUserData();

      messaging.requestPermission()
        .then(() => messaging.getToken())
        .then((token) => {
          console.log('FCM Token:', token);
          fetch('http://localhost:5000/salvar_fcm_token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ fcm_token: token })
          });
        })
        .catch((error) => {
          console.error('Erro ao obter permissão para notificações push:', error);
        });
    }
  }, [token, fetchMetas, formik]);

  const handleDefinirMeta = async (values) => {
    const response = await fetch('http://localhost:5000/definir_meta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(data.mensagem);
      fetchMetas();
    } else {
      toast.error(data.mensagem || 'Erro ao definir meta');
    }
  };

  const handleAtualizarProgresso = async (meta, progresso) => {
    const response = await fetch('http://localhost:5000/atualizar_progresso', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ descricao: meta.descricao, progresso })
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(data.mensagem);
      fetchMetas();
    } else {
      toast.error(data.mensagem || 'Erro ao atualizar progresso');
    }
  };

  const dataGrafico = {
    labels: historicoPeso.map(item => item.data),
    datasets: [
      {
        label: t('weight'),
        data: historicoPeso.map(item => item.peso),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue'
      }
    ]
  };

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('Formulário Pessoal')}
        </Typography>
        {!token ? (
          <Box>
            <Typography variant="h6">{t('Registrar')}</Typography>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('Nome')}
                    name="nome"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.nome}
                    error={formik.touched.nome && Boolean(formik.errors.nome)}
                    helperText={formik.touched.nome && formik.errors.nome}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('Telefone')}
                    name="telefone"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.telefone}
                    error={formik.touched.telefone && Boolean(formik.errors.telefone)}
                    helperText={formik.touched.telefone && formik.errors.telefone}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('Idade')}
                    name="idade"
                    type="number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.idade}
                    error={formik.touched.idade && Boolean(formik.errors.idade)}
                    helperText={formik.touched.idade && formik.errors.idade}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('Altura')}
                    name="altura"
                    type="number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.altura}
                    error={formik.touched.altura && Boolean(formik.errors.altura)}
                    helperText={formik.touched.altura && formik.errors.altura}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('Peso')}
                    name="peso"
                    type="number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.peso}
                    error={formik.touched.peso && Boolean(formik.errors.peso)}
                    helperText={formik.touched.peso && formik.errors.peso}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('Gênero')}
                    name="genero"
                    select
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.genero}
                    error={formik.touched.genero && Boolean(formik.errors.genero)}
                    helperText={formik.touched.genero && formik.errors.genero}
                    required
                  >
                    <MenuItem value="masculino">{t('male')}</MenuItem>
                    <MenuItem value="feminino">{t('female')}</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('Objetivo')}
                    name="objetivo"
                    select
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.objetivo}
                    error={formik.touched.objetivo && Boolean(formik.errors.objetivo)}
                    helperText={formik.touched.objetivo && formik.errors.objetivo}
                    required
                  >
                    <MenuItem value="ganho_muscular">{t('Ganho de Massa Muscular')}</MenuItem>
                    <MenuItem value="perda_peso">{t('Perda de Peso')}</MenuItem>
                    <MenuItem value="manutencao">{t('Manutenção')}</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('Nível de Atividade')}
                    name="nivel_atividade"
                    select
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.nivel_atividade}
                    error={formik.touched.nivel_atividade && Boolean(formik.errors.nivel_atividade)}
                    helperText={formik.touched.nivel_atividade && formik.errors.nivel_atividade}
                    required
                  >
                    <MenuItem value="sedentario">{t('Sedentário')}</MenuItem>
                    <MenuItem value="leve">{t('Leve')}</MenuItem>
                    <MenuItem value="moderado">{t('Moderado')}</MenuItem>
                    <MenuItem value="intenso">{t('Intenso')}</MenuItem>
                    <MenuItem value="muito_intenso">{t('Muito Intenso')}</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t('Histórico de Saúde')}
                    name="historico_saude"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.historico_saude}
                    error={formik.touched.historico_saude && Boolean(formik.errors.historico_saude)}
                    helperText={formik.touched.historico_saude && formik.errors.historico_saude}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t('Preferência de Dieta')}
                    name="preferencias_alimentares"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.preferencias_alimentares}
                    error={formik.touched.preferencias_alimentares && Boolean(formik.errors.preferencias_alimentares)}
                    helperText={formik.touched.preferencias_alimentares && formik.errors.preferencias_alimentares}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t('Email')}
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t('Senha')}
                    name="senha"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.senha}
                    error={formik.touched.senha && Boolean(formik.errors.senha)}
                    helperText={formik.touched.senha && formik.errors.senha}
                    required
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                {isLoading ? <CircularProgress size={24} /> : t('Registrar')}
              </Button>
            </Box>
            <Typography variant="h6" gutterBottom>{t('Login')}</Typography>
            <Box component="form" onSubmit={handleLogin} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label={t('Email')}
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t('Senha')}
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={senhaLogin}
                    onChange={(e) => setSenhaLogin(e.target.value)}
                    required
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                {isLoading ? <CircularProgress size={24} /> : t('login')}
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Button onClick={handleLogout} variant="contained" color="secondary" sx={{ marginBottom: 2 }}>
              {t('logout')}
            </Button>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('name')}
                    name="nome"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.nome}
                    error={formik.touched.nome && Boolean(formik.errors.nome)}
                    helperText={formik.touched.nome && formik.errors.nome}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('phone')}
                    name="telefone"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.telefone}
                    error={formik.touched.telefone && Boolean(formik.errors.telefone)}
                    helperText={formik.touched.telefone && formik.errors.telefone}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('age')}
                    name="idade"
                    type="number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.idade}
                    error={formik.touched.idade && Boolean(formik.errors.idade)}
                    helperText={formik.touched.idade && formik.errors.idade}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('height')}
                    name="altura"
                    type="number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.altura}
                    error={formik.touched.altura && Boolean(formik.errors.altura)}
                    helperText={formik.touched.altura && formik.errors.altura}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('weight')}
                    name="peso"
                    type="number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.peso}
                    error={formik.touched.peso && Boolean(formik.errors.peso)}
                    helperText={formik.touched.peso && formik.errors.peso}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('gender')}
                    name="genero"
                    select
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.genero}
                    error={formik.touched.genero && Boolean(formik.errors.genero)}
                    helperText={formik.touched.genero && formik.errors.genero}
                    required
                  >
                    <MenuItem value="masculino">{t('male')}</MenuItem>
                    <MenuItem value="feminino">{t('female')}</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('goal')}
                    name="objetivo"
                    select
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.objetivo}
                    error={formik.touched.objetivo && Boolean(formik.errors.objetivo)}
                    helperText={formik.touched.objetivo && formik.errors.objetivo}
                    required
                  >
                    <MenuItem value="ganho_muscular">{t('muscle_gain')}</MenuItem>
                    <MenuItem value="perda_peso">{t('weight_loss')}</MenuItem>
                    <MenuItem value="manutencao">{t('maintenance')}</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={t('activity_level')}
                    name="nivel_atividade"
                    select
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.nivel_atividade}
                    error={formik.touched.nivel_atividade && Boolean(formik.errors.nivel_atividade)}
                    helperText={formik.touched.nivel_atividade && formik.errors.nivel_atividade}
                    required
                  >
                    <MenuItem value="sedentario">{t('sedentary')}</MenuItem>
                    <MenuItem value="leve">{t('light')}</MenuItem>
                    <MenuItem value="moderado">{t('moderate')}</MenuItem>
                    <MenuItem value="intenso">{t('intense')}</MenuItem>
                    <MenuItem value="muito_intenso">{t('very_intense')}</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t('health_history')}
                    name="historico_saude"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.historico_saude}
                    error={formik.touched.historico_saude && Boolean(formik.errors.historico_saude)}
                    helperText={formik.touched.historico_saude && formik.errors.historico_saude}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t('diet_preferences')}
                    name="preferencias_alimentares"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.preferencias_alimentares}
                    error={formik.touched.preferencias_alimentares && Boolean(formik.errors.preferencias_alimentares)}
                    helperText={formik.touched.preferencias_alimentares && formik.errors.preferencias_alimentares}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t('email')}
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t('password')}
                    name="senha"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.senha}
                    error={formik.touched.senha && Boolean(formik.errors.senha)}
                    helperText={formik.touched.senha && formik.errors.senha}
                    required
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                {isLoading ? <CircularProgress size={24} /> : (isEditing ? t('update') : t('submit'))}
              </Button>
            </Box>
          </>
        )}
        {recomendacoes && (
          <Box marginTop={4}>
            <Typography variant="h5">{t('recommendations')}</Typography>
            <Typography><strong>{t('tde')}:</strong> {recomendacoes.tde}</Typography>
            <Typography><strong>{t('training_plan')}:</strong> {recomendacoes.plano_treino}</Typography>
            <Typography><strong>{t('diet_plan')}:</strong> {recomendacoes.plano_dieta}</Typography>
          </Box>
        )}
        {historicoPeso.length > 0 && (
          <Box marginTop={4}>
            <Typography variant="h5">{t('progress')}</Typography>
            <Line data={dataGrafico} />
          </Box>
        )}
        <Button onClick={() => setOpenMetaDialog(true)} variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          {t('Definir Objetivo')}
        </Button>
        {metas.map((meta, index) => (
          <Box key={index} marginTop={2}>
            <Typography><strong>{t('goal_description')}:</strong> {meta.descricao}</Typography>
            <Typography><strong>{t('start_date')}:</strong> {meta.data_inicio}</Typography>
            <Typography><strong>{t('end_date')}:</strong> {meta.data_fim}</Typography>
            <Typography><strong>{t('progress')}:</strong> {meta.progresso}%</Typography>
            <TextField
              label={t('update_progress')}
              type="number"
              fullWidth
              margin="normal"
              variant="outlined"
              defaultValue={meta.progresso}
              onBlur={(e) => handleAtualizarProgresso(meta, e.target.value)}
            />
          </Box>
        ))}
      </Paper>
      <Dialog open={openMetaDialog} onClose={() => setOpenMetaDialog(false)}>
        <DialogTitle>{t('set_goal')}</DialogTitle>
        <DialogContent>
          <TextField
            label={t('goal_description')}
            name="descricao"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.descricao}
            error={formik.touched.descricao && Boolean(formik.errors.descricao)}
            helperText={formik.touched.descricao && formik.errors.descricao}
            required
          />
          <TextField
            label={t('start_date')}
            name="data_inicio"
            type="date"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            onChange={formik.handleChange}
            value={formik.values.data_inicio}
            error={formik.touched.data_inicio && Boolean(formik.errors.data_inicio)}
            helperText={formik.touched.data_inicio && formik.errors.data_inicio}
            required
          />
          <TextField
            label={t('end_date')}
            name="data_fim"
            type="date"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            onChange={formik.handleChange}
            value={formik.values.data_fim}
            error={formik.touched.data_fim && Boolean(formik.errors.data_fim)}
            helperText={formik.touched.data_fim && formik.errors.data_fim}
            required
          />
          <TextField
            label={t('progress')}
            name="progresso"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.progresso}
            error={formik.touched.progresso && Boolean(formik.errors.progresso)}
            helperText={formik.touched.progresso && formik.errors.progresso}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMetaDialog(false)} color="secondary">{t('cancel')}</Button>
          <Button onClick={() => {
            handleDefinirMeta(formik.values);
            setOpenMetaDialog(false);
          }} color="primary">{t('submit')}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Form;
