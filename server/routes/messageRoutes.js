// messageRoutes.js
const express = require('express');
const router = express.Router();
const { messagePost, MessageGet } = require('../services/messageService');

router.post('/', messagePost);
router.get('/', MessageGet);

module.exports = router;
