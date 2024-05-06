module.exports = (usersCollection, messagesCollection) => { 
    const express = require('express');
    const router = express.Router();
    const userService = require('./services/userService')(usersCollection);
    const messageService = require('./services/messageService')(messagesCollection);

    // Routes pour les utilisateurs
    router.put('/users/signin', userService.createUser);
    router.post('/users/login', userService.handleLogin);
    router.get('/users/ListUsers', userService.getUsers);
    router.post('/users/:userId/validate', userService.legitUser);
    router.delete('/users/:userId/delete', userService.deleteUser);
    router.get('/users/unvalidated-users', userService.getUnvalidatedUsers);
    router.post('/users/:userId/promote', userService.promoteToAdmin);
    router.post('/users/:userId/demote', userService.demoteFromAdmin);
    router.get('/users/profile/login/:login', userService.getUserByLogin);

    // Routes pour les messages
    router.post('/messages', messageService.messagePost);
    router.get('/messages', messageService.MessageGet);
    router.delete('/messages/:messageId', messageService.deleteMessage);
    router.put('/messages/:messageId', messageService.updateMessage);
    router.get('/messages/id/:messageId', messageService.getMessageById);// retourne les message par id de message
    router.get('/messages/login/:login', messageService.getMessagesByLogin);
    router.post('/messages/:messageId/responses', messageService.postResponse);
    router.post('/messages/hide', messageService.PostMessageHide);
    router.get('/messages/hide', messageService.GetMessageHide);
    router.get('/messages/reveal/search', messageService.searchMessagesReveal);
    router.get('/messages/hide/search', messageService.searchMessagesHide);




    return router;
};
