const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importez cors

const app = express();

// Activez CORS pour toutes les origines ou configurez selon vos besoins
app.use(cors());
app.use(express.json());


// Connectez-vous à MongoDB
mongoose.connect('mongodb://localhost:27017/organiz-asso')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


// Pour les routes d'utilisateur
app.use('/api/users', require('./routes/userRoutes'));

// Pour les routes de messages
app.use('/api/messages', require('./routes/messageRoutes'));

// Définir le port
const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
