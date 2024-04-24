module.exports = (usersCollection) => {
    const express = require('express');
    const router = express.Router();
    const userService = require('../services/userService')(usersCollection);

    router.post('/signin', userService.createUser);
    router.get('/ListUsers', userService.getUsers);
    router.post('/login', userService.handleLogin);

    return router;
};
