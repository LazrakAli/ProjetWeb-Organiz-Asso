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



exports.GetOwnMessage = async (req, res) => {
    const userLogin = req.params.login.toLowerCase(); // Convertit le login en minuscules pour assurer la correspondance
    try {
        const messages = await Message.find({ login: userLogin }); // Récupère les messages pour l'utilisateur spécifié
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des messages", error: error.message });
    }
};


exports.deleteMessage = async (req, res) => {
    try {
       const { messageId } = req.params; // ID du message à supprimer
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ message: "Message non trouvé" });
        }
        await Message.findByIdAndDelete(messageId);
        res.status(200).json({ message: "Message supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du message", error: error.message });
    }
};


exports.updateMessage = async (req, res) => {
    try {
        const { messageId } = req.params; // ID du message à modifier
        const { texte } = req.body; // Nouveau titre et nouveau texte du message

        // Recherche du message à modifier
        let message = await Message.findById(messageId);

        // Vérification si le message existe
        if (!message) {
            return res.status(404).json({ message: "Message non trouvé" });
        }

        // Mise à jour du titre et du texte du message
        message.texte = texte;

        // Sauvegarde des modifications
        await message.save();

        // Réponse indiquant que le message a été modifié avec succès
        res.status(200).json({ message: "Message modifié avec succès" });
    } catch (error) {
        // Gestion des erreurs en cas de problème lors de la modification du message
        res.status(500).json({ message: "Erreur lors de la modification du message", error: error.message });
    }
};
