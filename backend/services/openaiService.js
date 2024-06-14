const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const generateWorkout = async (userProfile) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Gere um treino personalizado para um usuário com os seguintes dados: ${JSON.stringify(userProfile)}`,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedWorkout = response.data.choices[0].text;
    // Parse ou ajuste a resposta conforme necessário
    const workout = {
      exercises: [
        // Parseie os exercícios do `generatedWorkout` aqui
        { name: "Supino Reto", series: 3, repetitions: "10-12", muscle: "Peito" },
        // Outros exercícios...
      ]
    };

    return workout;
  } catch (error) {
    console.error('Erro ao chamar a API da OpenAI:', error);
    throw new Error('Erro ao gerar o treino');
  }
};

module.exports = { generateWorkout };
