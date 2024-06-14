const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nutritionRoutes = require('./routes/nutrition');
const openaiRoutes = require('./routes/openai');
const userRoutes = require('./routes/user'); // Adicionar rota de usuário

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/nutrition', nutritionRoutes);
app.use('/api', openaiRoutes);
app.use('/api/user', userRoutes); // Usar rotas de usuário

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
