const express = require('express');
const router = express.Router();
const {yupValidator} = require('../middleware/yup.js');
const {authMiddleware} = require('../middleware/authMiddleware.js');
const {getChallenges,
    getChallengeById,
    submitSolution,
    ModifyChallenge,
    AddNewChallenge} = require('../controllers/challengeController.js');

router.get('/challenges', authMiddleware, getChallenges);   

router.get('/challenges/:id', authMiddleware, getChallengeById);

router.post('/challenges/:id/submit', authMiddleware, submitSolution);

router.put('/modify/challenges/:id', authMiddleware, ModifyChallenge);

router.post('/add/challenges', authMiddleware, AddNewChallenge);

module.exports = router;