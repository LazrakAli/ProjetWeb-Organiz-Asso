const { ObjectId } = require('mongodb');

module.exports = (responsesCollection) => {
    return {
        postResponse: async (req, res) => {
            try {
                const { messageId, userId, texte } = req.body;
                const newResponse = { 
                    messageId: new ObjectId(messageId), 
                    userId: new ObjectId(userId), 
                    texte, 
                    createdAt: new Date() 
                };
                const result = await responsesCollection.insertOne(newResponse);
                const savedResponse = { _id: result.insertedId, ...newResponse };
                res.status(201).json({ message: 'Response posted successfully', savedResponse });
            } catch (error) {
                console.error('Error posting response:', error);
                res.status(500).json({ message: 'Error posting response', error: error.message });
            }
        },

        getAllResponsesOfAMessage: async (req, res) => {
            const { messageId } = req.params;
            try {
                const responses = await responsesCollection.find({ messageId: new ObjectId(messageId) }).toArray();
                if (responses.length === 0) {
                    return res.status(404).json({ message: "Aucune réponse trouvée pour ce message." });
                }
                res.json(responses);
            } catch (error) {
                res.status(500).json({ message: "Erreur lors de la récupération des réponses", error: error.toString() });
            }
        }
        
        
    };    
};
