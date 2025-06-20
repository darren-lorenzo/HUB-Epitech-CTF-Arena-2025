const express = require('express');
const router = express.Router();
const {yupValidator} = require('../middleware/yup.js');
const {authMiddleware} = require('../middleware/authMiddleware.js');
const {UserProfile, userBoard} = require('../controllers/userController.js');

// Route pour récupérer le profil de l'utilisateur
router.get('/profile', authMiddleware, UserProfile);

// Route pour récupérer le classement de l'utilisateur
router.get('/userboard', authMiddleware, userBoard);


