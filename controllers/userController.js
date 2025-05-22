const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Fonction pour enrégistrer un nouvel utilisateur et crypter le mot de passe

const registerUser =  async (req, res) => {
    const data = req.body;
    let nv_nom = data.Nom.toUpperCase();
    let nv_prenom = data.Prenom.toUpperCase();

    try {
        const password =  await bcrypt.hash(data.Password, 10);
        data.Password = password; // fin du hashage
        const user_data = {
            Nom: nv_nom,
            Prenom: nv_prenom,
            Email: data.Email,
            Password: data.Password,
            Promotion: data.Promotion
        };
        const user = new Users (user_data);
        await user.save();
        res.status(201).json({ message: 'Utilisateur Enrégistrer' });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.Email && error.keyPattern) {
            return res.status(400).json({ error: true, message: 'Email déjà utilisé' });
        } else {
            res.status(500).json({ error: true, message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
        }
    }
};

// Fonction pour se connecter
const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await Users.findOne({ Email }, {projection: { _id: 0 } });
        if (!user) {
            return res.status(400).json({ error: true, message: 'Email est invalide' });
        }
        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: true, message: 'Mot de passe invalide' });   
        }
        // Génération du token
        const token =  generateJwt(user);
        res.status(200).json({
            message: 'Connexion réussie',
            data:token,
            user});
    } catch (error) {
        res.status(500).json({ error: true, message: 'Erreur lors de la connexion, Veuilez réessayer' });
    }
};

// Fonction pour générer le token
const generateJwt= (identity) =>{
    try {
      const token = jwt.sign({ identity }, process.env.JWT_SECRET, { expiresIn: "12h" });
  
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 12);
  
      return {
        token,
        expiresIn: "12h",
        expirationTime
      };
    }
    catch (error) {
      // console.log(error);
    }
  };

  module.exports = {
    registerUser,
    loginUser,
  };