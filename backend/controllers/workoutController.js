const { generateWorkout } = require('../services/openaiService');

const generateWorkoutController = async (req, res) => {
  const userProfile = req.body.userProfile;

  if (!userProfile) {
    return res.status(400).json({ error: 'Dados do perfil do usuário não fornecidos' });
  }

  try {
    const workout = await generateWorkout(userProfile);
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar o treino' });
  }
};

module.exports = { generateWorkoutController };
