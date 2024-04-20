const mongoose = require('mongoose');

const userMessage = new mongoose.Schema({
    login: { type: String, required: true },
    titre: { type: String, required: true, maxlength: 50 },
    texte: { type: String, required: true, maxlength: 400 },
    date: {  type: Date,   default: Date.now },
});

const Message = mongoose.model('Message', userMessage);
module.exports = Message;
