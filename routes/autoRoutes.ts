// src/routes/authRoutes.js
const express = require('express');
const { signup, login } = require('../controller/authController');

const router = express.Router();

const handleSignup = async (req, res) => {
    try {
        await signup(req, res);
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const handleLogin = async (req, res) => {
    try {
        await login(req, res);
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

router.post('/signup', handleSignup);
router.post('/login', handleLogin);

module.exports = router;
