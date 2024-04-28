const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('organiz-asso');
        const usersCollection = db.collection('users');
        const messagesCollection = db.collection('messages');
        const adminCollection = db.collection('admins');


        // Import du fichier api.js
        const apiRoutes = require('./api')(usersCollection, messagesCollection);

        // Utilisation des routes définies dans api.js
        app.use('/api', apiRoutes);
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

startServer();
