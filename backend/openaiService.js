const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generatePlan = async (user) => {
    const prompt = `
    Based on the user's data:
    Name: ${user.name}
    Age: ${user.age}
    Weight: ${user.weight}
    Height: ${user.height}
    Generate a personalized fitness and diet plan.
    `;

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 500,
    });

    return response.data.choices[0].text;
};

module.exports = { generatePlan };
