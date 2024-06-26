module.exports = (usersCollection) => {
    const bcrypt = require('bcryptjs');
    const { ObjectId } = require('mongodb');

    return {
        createUser: async (req, res) => {
            try {
                const { email, password, login, lastName, firstName } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = {
                    email,
                    password: hashedPassword,
                    login,
                    lastName,
                    firstName,
                    profile_validee: 0,
                    admin: false // Ajouter l'attribut admin avec la valeur par défaut false
                };
                await usersCollection.insertOne(newUser);
                res.status(201).send({ message: "Utilisateur créé avec succès", user: newUser });
            } catch (error) {
                res.status(400).send({ message: "Erreur lors de la création de l'utilisateur", error: error.message });
            }
        },
        getUsers: async (req, res) => {
            try {
                const users = await usersCollection.find({}).toArray();
                res.status(200).send(users);
            } catch (error) {
                res.status(500).send({ message: "Erreur lors de la récupération des utilisateurs", error: error.message });
            }
        },
        
        getUserByLogin : async (req, res) => {
            try {
                const login = req.params.login;
                const user = await usersCollection.findOne({ login: login });
                if (!user) {
                    console.log("No user found for login:", login);
                    return res.status(404).json({ message: "Utilisateur non trouvé" });
                }
                const userDetails = {
                    login: user.login,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    admin: user.admin,
                    email: user.email
                };
                res.json(userDetails);
            } catch (error) {
                console.error("Error in getUserByLogin:", error);
                res.status(500).json({ message: "Erreur lors de la récupération des détails de l'utilisateur", error: error.message });
            }
        },

        deleteUser: async (req, res) => {
            try {
                const { userId } = req.params;
                const deleteResult = await usersCollection.deleteOne({ _id: new ObjectId(userId) });
                if (deleteResult.deletedCount === 1) {
                    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
                } else {
                    res.status(404).json({ message: "Utilisateur non trouvé" });
                }
            } catch (error) {
                res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error: error.message });
            }
        },
        
        // Fonction pour valider un utilisateur
        legitUser: async (req, res) => {
            try {
                const userId = new ObjectId(req.params.userId); // Convertir l'ID de chaîne en ObjectId
                const updateResult = await usersCollection.updateOne(
                    { _id: userId },
                    { $set: { profile_validee: 1 } }
                );
                if (updateResult.modifiedCount === 1) {
                    res.send({ message: "Utilisateur validé avec succès" });
                } else {
                    res.status(404).send({ message: "Utilisateur non trouvé" });
                }
            } catch (error) {
                console.error("Erreur lors de la validation de l'utilisateur:", error);
                res.status(500).send({ message: "Erreur serveur lors de la validation de l'utilisateur", error: error.message });
            }
        },
        // Fonction pour récupérer les utilisateurs non validés
        getUnvalidatedUsers: async (req, res) => {
            try {
                const users = await usersCollection.find({ profile_validee: 0 }).toArray(); // Assurez-vous que la collection s'appelle 'usersCollection'
                res.json(users); // Utilisez res.json pour envoyer les données au client
            } catch (error) {
                console.error("Erreur dans la récupération des utilisateurs non validés", error);
                res.status(500).send({ message: "Erreur de serveur lors de la récupération des utilisateurs non validés" });
            }
        },
        promoteToAdmin: async (req, res) => {
            try {
                const userId = new ObjectId(req.params.userId);
                const updateResult = await usersCollection.updateOne(
                    { _id: userId },
                    { $set: { admin: true } }
                );
                if (updateResult.modifiedCount === 1) {
                    res.send({ message: "Utilisateur promu admin avec succès" });
                } else {
                    res.status(404).send({ message: "Utilisateur non trouvé" });
                }
            } catch (error) {
                console.error("Erreur lors de la promotion de l'utilisateur en admin:", error);
                res.status(500).send({ message: "Erreur serveur lors de la promotion de l'utilisateur", error: error.message });
            }
        },
        demoteFromAdmin : async (req, res) => {
            try {
                const userId = new ObjectId(req.params.userId);
                const updateResult = await usersCollection.updateOne(
                    { _id: userId },
                    { $set: { admin: false } }
                );
                if (updateResult.modifiedCount === 1) {
                    res.send({ message: "Admin rétrogradé en utilisateur avec succès" });
                } else {
                    res.status(404).send({ message: "Admin non trouvé" });
                }
            } catch (error) {
                console.error("Erreur lors de la rétrogradation de l'admin:", error);
                res.status(500).send({ message: "Erreur serveur lors de la rétrogradation de l'admin", error: error.message });
            }
        },

        handleLogin: async (req, res) => {
            try {
                const { email, password } = req.body;
                const user = await usersCollection.findOne({ email });
                if (!user) {
                    return res.status(404).send({ message: "Utilisateur non trouvé" });
                }
        
                // Ajoutez cette vérification pour voir si le profil de l'utilisateur a été validé
                if (user.profile_validee === 0) {
                    return res.status(403).send({ message: "Compte non validé. Veuillez attendre la validation de votre compte par un administrateur." });
                }
        
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).send({ message: "Mot de passe incorrect" });
                }
        
                res.send({
                    message: "Connexion réussie",
                    user: {
                        _id: user._id,
                        email: user.email,
                        login: user.login,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        admin: user.admin
                    }
                });
            } catch (error) {
                res.status(500).send({ message: "Erreur de connexion", error: error.message });
            }
        }
        
    };
};
