const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { generatePlan } = require('../openaiService');

// Endpoint para criar um novo usuário
router.post('/', (req, res) => {
    const newUser = new User(req.body);

    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Endpoint para obter todos os usuários
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Endpoint para gerar recomendações personalizadas
router.post('/recommendations', async (req, res) => {
    const user = req.body;
    try {
        const recommendations = await generatePlan(user);
        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
