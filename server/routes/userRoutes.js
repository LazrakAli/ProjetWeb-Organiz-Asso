module.exports = (usersCollection) => {

    const express = require('express');
    const router = express.Router();
    const userService = require('../services/userService')(usersCollection);

    router.put('/signin', userService.createUser);
    router.get('/ListUsers', userService.getUsers);
    router.post('/login', userService.handleLogin);
    router.post('/validate-user/:userId', userService.legitUser);
    router.delete('/delete-user/:userId', userService.deleteUser);
    router.get('/unvalidated-users', userService.getUnvalidatedUsers);


    return router;
};
