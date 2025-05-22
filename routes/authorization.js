const express = require('express');
const router = express.Router();
const {yupValidator} = require('../middleware/yup.js');
const {registerUser, loginUser} = require ('../controllers/userController.js');
const {connexionDto} = require ('../dto/connexionDto.js');
const {NewUserDto} = require ('../dto/NewUserDto.js');

router.post('/login', yupValidator(connexionDto), loginUser);

router.post('/register', yupValidator(NewUserDto), registerUser);

router.get('/logout', (req, res) => {
    res.status(200).json({ message: 'Déconnexion réussie' });
}); 


module.exports = router;