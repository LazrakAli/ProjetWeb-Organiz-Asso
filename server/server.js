const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MongoClient = mongodb.MongoClient;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('organiz-asso');
        const usersCollection = db.collection('users');
        const messagesCollection = db.collection('messages');
        const adminCollection = db.collection('admins');

        const userRoutes = require('./routes/userRoutes')(usersCollection);
        const messageRoutes = require('./routes/messageRoutes')(messagesCollection);
        const adminRoutes = require('./routes/adminRoutes')(adminCollection);

        app.use('/api/users', userRoutes);
        app.use('/api/messages', messageRoutes);
        app.use('/api/admin',adminRoutes);
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

startServer();
