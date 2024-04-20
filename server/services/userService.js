const User = require('../models/user.model'); // Assurez-vous que le chemin est correct
const bcrypt = require('bcryptjs');

// Création d'un utilisateur
exports.createUser = async (req, res) => {
    try {
        const { email, password, login, lastName, firstName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash le mot de passe avec un salt de 10 rounds
        const newUser = new User({
            email,
            password: hashedPassword, // Enregistrez le mot de passe hashé
            login,
            lastName,
            firstName
        });
        await newUser.save();
        res.status(201).send({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (error) {
        res.status(400).send({ message: "Erreur lors de la création de l'utilisateur", error: error.message });
    }
};


// Récupération de tous les utilisateurs
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: "Erreur lors de la récupération des utilisateurs", error: error.message });
    }
};


// Connexion d'un utilisateur
exports.handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "Utilisateur non trouvé" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Mot de passe incorrect" });
        }
        // Assurez-vous d'envoyer toutes les infos nécessaires
        res.send({
            message: "Connexion réussie",
            user: {
                id: user._id,
                email: user.email,
                login: user.login,
                firstName: user.firstName, 
                lastName: user.lastName,
                publication: user.publication 
            }
        });
    } catch (error) {
        res.status(500).send({ message: "Erreur de connexion", error: error.message });
    }
};
