const express = require('express');
const router = express.Router();
const {getRankings, addScore, updateScore} = require('../controllers/rankController.js');
const {authMiddleware} = require('../middleware/authMiddleware.js');

// Route pour récupérer les classements
router.get('/rankings', authMiddleware, getRankings);

// Route pour ajouter un score
router.post('/add-score', authMiddleware, addScore);

// Route pour mettre à jour un score
router.put('/update-score', authMiddleware, updateScore);

module.exports = router;