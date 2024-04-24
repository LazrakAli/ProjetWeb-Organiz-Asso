module.exports = (adminCollection) => {
    const bcrypt = require('bcryptjs');
    
    return {
        createAdmin: async (req, res) => {
            try {
                const { email, password, login } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);
                const newAdmin = {
                    email,
                    password: hashedPassword,
                    login
                };
                await adminCollection.insertOne(newAdmin);
                res.status(201).send({ message: "Administrateur créé avec succès", admin: newAdmin });
            } catch (error) {
                res.status(400).send({ message: "Erreur lors de la création de l'administrateur", error: error.message });
            }
        },

        handleLoginAdmin: async (req, res) => {
            try {
                const { email, password } = req.body;
                const admin = await adminCollection.findOne({ email });
                if (!admin) {
                    return res.status(404).send({ message: "Administrateur non trouvé" });
                }
                const isMatch = await bcrypt.compare(password, admin.password);
                if (!isMatch) {
                    return res.status(401).send({ message: "Mot de passe incorrect" });
                }

                // Sauvegarde des données de l'administrateur dans le local storage
                const adminData = {
                    id: admin._id,
                    email: admin.email,
                    login: admin.login
                };
                res.send({
                    message: "Connexion réussie",
                    admin: adminData
                });
            } catch (error) {
                res.status(500).send({ message: "Erreur de connexion", error: error.message });
            }
        },
        handleLogout: async (req, res) => {
            try {
                // Suppression des données de l'administrateur du local storage
                res.send({ message: "Déconnexion réussie" });
            } catch (error) {
                res.status(500).send({ message: "Erreur lors de la déconnexion", error: error.message });
            }
        }

        
    };
};
