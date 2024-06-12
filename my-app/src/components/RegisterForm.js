// src/components/RegisterForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, CircularProgress, Grid, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RegisterForm = ({ isLoading, onSubmit }) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    nome: Yup.string().required(t('Nome é obrigatório')),
    telefone: Yup.string().required(t('Telefone é obrigatório')),
    idade: Yup.number().required(t('Idade é obrigatória')).min(1, t('Idade inválida')),
    altura: Yup.number().required(t('Altura é obrigatória')).min(1, t('Altura inválida')),
    peso: Yup.number().required(t('Peso é obrigatório')).min(1, t('Peso inválido')),
    genero: Yup.string().required(t('Gênero é obrigatório')),
    objetivo: Yup.string().required(t('Objetivo é obrigatório')),
    nivel_atividade: Yup.string().required(t('Nível de atividade é obrigatório')),
    email: Yup.string().email(t('Email inválido')).required(t('Email é obrigatório')),
    senha: Yup.string().required(t('Senha é obrigatória')),
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
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
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
            <MenuItem value="masculino">{t('Masculino')}</MenuItem>
            <MenuItem value="feminino">{t('Feminino')}</MenuItem>
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
    </form>
  );
};

export default RegisterForm;
