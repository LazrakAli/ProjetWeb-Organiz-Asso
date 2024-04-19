const express = require('express');
const router = express.Router();
const { createUser, getUsers, handleLogin } = require('../services/userService');


router.post('/signin', createUser);
router.get('/ListUsers', getUsers);
router.post('/login', handleLogin);  

module.exports = router;
