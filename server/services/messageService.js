const Message = require('../models/message.model');

// Poste un message de l'utilisateur 
exports.messagePost = async (req, res) => {
    try {
        const { login, titre, texte } = req.body;

        // Crée un nouveau message avec les données fournies
        const newMessage = new Message({ login, titre, texte });

        // Enregistre le nouveau message dans la base de données
        const savedMessage = await newMessage.save();

        res.status(201).json({ message: 'Message posted successfully', savedMessage });
    } catch (error) {
        res.status(500).json({ message: 'Error posting message', error: error.message });
    }
};


exports.MessageGet = async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ date: -1 }).limit(10); // Trie par date décroissante et limite à 10
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des messages", error: error.message });
    }
};