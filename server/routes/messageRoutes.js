module.exports = (messagesCollection) => {
    const router = require('express').Router();
    const { messagePost, MessageGet, GetOwnMessage, deleteMessage, updateMessage } = require('../services/messageService')(messagesCollection);

    router.post('/', messagePost);
    router.get('/', MessageGet);
    router.get("/:login", GetOwnMessage);
    router.delete('/:messageId', deleteMessage);
    router.put('/:messageId', updateMessage);

    return router;
};
