const express = require('express');
const router = express.Router();
const { messagePost, MessageGet, GetOwnMessage, deleteMessage, updateMessage } = require('../services/messageService');

router.post('/', messagePost);
router.get('/', MessageGet);
router.get("/:login", GetOwnMessage);
router.delete('/:messageId', deleteMessage);
router.put('/:messageId', updateMessage);

module.exports = router;
