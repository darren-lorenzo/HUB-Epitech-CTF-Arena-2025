//import de mongoose
const mongoose = require('mongoose');
const Roles =  require("./roles.js");

//Definition du schema mongoose pour les utilisateurs
const userSchema = new mongoose.Schema({
  Nom: { type: String, required: true },
  Prenom: { type: String, required: true },
  Alias: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Affiliation : {type: String, required: false},
});


//Exports du modèle pour l'utiliser ailleurs dans l'application
module.exports = mongoose.model('Users', userSchema);