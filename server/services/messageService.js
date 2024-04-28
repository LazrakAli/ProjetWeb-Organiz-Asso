const { ObjectId } = require('mongodb');

module.exports = (messagesCollection) => ({
    
    messagePost: async (req, res) => {
        try {
            const { login, titre, texte } = req.body;
            // Création du nouveau message avec le tableau de réponses vide et visible par défaut à true
            const newMessage = { 
                login, 
                titre, 
                texte, 
                date: new Date(), 
                reponses: [], // tableau vide pour les réponses
                visible: true // visible par défaut
            };
            const result = await messagesCollection.insertOne(newMessage);
            const savedMessage = { _id: result.insertedId, ...newMessage };
            res.status(201).json({ message: 'Message posted successfully', savedMessage });
        } catch (error) {
            res.status(500).json({ message: 'Error posting message', error: error.message });
        }
    },

    MessageGet: async (req, res) => {
        try {
            // Ajoutez un filtre pour ne sélectionner que les messages où 'visible' est true
            const messages = await messagesCollection.find({ visible: true })
                                                     .sort({ date: -1 })
                                                     .limit(30)
                                                     .toArray();
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des messages", error: error.message });
        }
    },

    getMessageById: async (req, res) => {
        try {
            const { messageId } = req.params;
            const message = await messagesCollection.findOne({ _id: new ObjectId(messageId) });

            if (!message) {
                return res.status(404).json({ message: "Message non trouvé." });
            }

            res.status(200).json(message);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du message", error: error.message });
        }
    },
    PostMessageHide: async (req, res) => {
        try {
            const { login, titre, texte } = req.body;
            const newMessage = {
                login, 
                titre, 
                texte, 
                date: new Date(), 
                reponses: [],
                visible: false // le message sera caché
            };
            const result = await messagesCollection.insertOne(newMessage);
            const savedMessage = { _id: result.insertedId, ...newMessage };
            res.status(201).json({ message: 'Message caché posté avec succès', savedMessage });
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la publication du message caché', error: error.message });
        }
    },

    GetMessageHide: async (req, res) => {
        try {
            const messages = await messagesCollection.find({ visible: false })
                                                     .sort({ date: -1 })
                                                     .toArray();
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des messages cachés", error: error.message });
        }
    },
    
    
    getMessagesByLogin: async (req, res) => {
        try {
            const { login } = req.params;
            const messages = await messagesCollection.find({ login: login.toLowerCase() }).toArray();

            if (messages.length === 0) {
                return res.status(404).json({ message: "Aucun message trouvé pour cet utilisateur." });
            }

            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des messages", error: error.message });
        }
    },
    deleteMessage: async (req, res) => {
        try {
            const { messageId } = req.params;
            const result = await messagesCollection.deleteOne({ _id: new ObjectId(messageId) });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Message non trouvé" });
            }
            res.status(200).json({ message: "Message supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du message", error: error.toString() });
        }
    },

    updateMessage: async (req, res) => {
        const { messageId } = req.params;
        const { texte } = req.body;
        try {
            const result = await messagesCollection.updateOne(
                { _id: new ObjectId(messageId) },
                { $set: { texte } }
            );
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Message non trouvé" });
            }
            res.status(200).json({ message: "Message modifié avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la modification du message", error: error.toString() });
        }
    },
    postResponse: async (req, res) => {
        try {
            const { messageId } = req.params; // ID du message à partir de l'URL
            const { login, texte } = req.body; // Login et texte de la réponse à partir du corps de la requête
            
            // Créer un nouvel objet réponse
            const newResponse = {
                login: login,  // Qui a répondu
                texte: texte,  // Le texte de la réponse
                date: new Date()  // Date et heure de la réponse
            };

            // Ajouter la nouvelle réponse au tableau des réponses du message
            const updateResult = await messagesCollection.updateOne(
                { _id: new ObjectId(messageId) }, // Filtrer par l'ID du message
                { $push: { reponses: newResponse } } // Ajouter la réponse au tableau des réponses
            );

            // Vérifier si le message a été mis à jour
            if (updateResult.modifiedCount === 0) {
                return res.status(404).json({ message: "Message non trouvé ou aucune mise à jour nécessaire." });
            }

            res.status(200).json({ message: 'Réponse ajoutée avec succès' });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de l'ajout de la réponse", error: error.message });
        }
    }
});