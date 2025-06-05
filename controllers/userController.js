const Users = require('../models/user');
const Scoreboard = require('../models/scoreboard.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');


// Fonction pour enrégistrer un nouvel utilisateur, crypter le mot de passe et créer son ranking.

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
            Alias: data.Alias,
            Email: data.Email,
            Password: data.Password,
            Affiliation: data.Affiliation
        };
        const new_user = new Users(user_data);
        let NewUser = await new_user.save();
        const ranking_data = {
            username: data.Alias,
            affiliation: data.Affiliation,
            score: 0,
            id_user: NewUser._id
        }
        const userboard = new Scoreboard(ranking_data);
        let newBoard = await userboard.save();
        res.status(201).json({ message: 'Utilisateur Enrégistrer' });
        console.log (new_user);
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
        let body = req.body;
        let { Email, Password } = body;
        const utilisateur = await Users.findOne({ Email });
        console.log(utilisateur);
        if (!utilisateur) {
            return res.status(400).json({ error: true, message: 'Email est invalide' });
        }
        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(Password, utilisateur.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: true, message: 'Mot de passe invalide' });   
        }
        // Génération du token
        const token =  generateJwt(utilisateur);
        res.status(200).json({
            message: 'Connexion réussie',
            data:token,
            utilisateur});
    } catch (error) {
        res.status(500).json({ error: true, message: 'Erreur lors de la connexion, Veuilez réessayer' });
    }
};

const UserProfile = async (req, res) => {
    try {
        const userId = req.user.identity._id; // Récupération de l'ID de l'utilisateur à partir du token
        const user = await Users.findById(userId).select('-Password'); // Exclure le mot de passe du résultat
        if (!user) {
            return res.status(404).json({ error: true, message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Profil utilisateur récupéré avec succès', data: user });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Erreur lors de la récupération du profil utilisateur' });
    }

}

const userBoard = async (req, res) => {
    try {
        const userId = req.user.identity._id; // Récupération de l'ID de l'utilisateur à partir du token
        const user = await Scoreboard.findOne({ id_user: userId });
        if (!user) {
            return res.status(404).json({ error: true, message: 'Classement utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Classement utilisateur récupéré avec succès', data: user });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Erreur lors de la récupération du classement utilisateur' });
    }
}



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
    UserProfile,
    userBoard
  };