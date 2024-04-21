// messageRoutes.js
const express = require('express');
const router = express.Router();
const { messagePost, MessageGet, GetOwnMessage } = require('../services/messageService');

router.post('/', messagePost);
router.get('/', MessageGet);
router.get("/:login", GetOwnMessage);

module.exports = router;
