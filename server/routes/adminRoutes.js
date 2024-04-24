module.exports = (adminCollection) => {
    const express = require('express');
    const router = express.Router();
    const adminService = require('../services/adminService')(adminCollection);

    // Route pour la création d'un administrateur
    router.post('/signin', adminService.createAdmin);

    // Route pour la connexion de l'administrateur
    router.post('/login', adminService.handleLoginAdmin);

    // Route pour la déconnexion de l'administrateur
    router.post('/logout', adminService.handleLogout);

    return router;
};
