module.exports = (messagesCollection) => ({
    messagePost: async (req, res) => {
        try {
            const { login, titre, texte } = req.body;
            const newMessage = { login, titre, texte, date: new Date() };
            const result = await messagesCollection.insertOne(newMessage);
            const savedMessage = { _id: result.insertedId, ...newMessage };
            res.status(201).json({ message: 'Message posted successfully', savedMessage });
        } catch (error) {
            res.status(500).json({ message: 'Error posting message', error: error.message });
        }
    },

    MessageGet: async (req, res) => {
        try {
            const messages = await messagesCollection.find().sort({ date: -1 }).limit(30).toArray();
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des messages", error: error.message });
        }
    },

    GetOwnMessage: async (req, res) => {
        const userLogin = req.params.login.toLowerCase();
        try {
            const messages = await messagesCollection.find({ login: userLogin }).toArray();
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des messages", error: error.message });
        }
    },

    deleteMessage: async (req, res) => {
        
        try {
            const { messageId } = req.params;
            const result = await messagesCollection.deleteOne({ _id: new mongodb.ObjectId(messageId) });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Message non trouvé" });
            }
            res.status(200).json({ message: "Message supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du message", error: error.message });
        }
    },

    updateMessage: async (req, res) => {
        const { messageId } = req.params;
        const { texte } = req.body;
        try {
            const result = await messagesCollection.updateOne(
                { _id: new mongodb.ObjectId(messageId) },
                { $set: { texte } }
            );
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Message non trouvé" });
            }
            res.status(200).json({ message: "Message modifié avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la modification du message", error: error.message });
        }
    }
});
