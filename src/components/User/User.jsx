const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Utilisé pour la connexion
  password: { type: String, required: true }, // Mot de passe crypté, nécessaire
  login: String, // Optionnel, selon votre besoin
  lastname: String, // Nom de famille de l'utilisateur
  firstname: String // Prénom de l'utilisateur
});

const User = mongoose.model('User', userSchema);
module.exports = User;
