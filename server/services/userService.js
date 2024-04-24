module.exports = (usersCollection) => {
    const bcrypt = require('bcryptjs');

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
                    firstName
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
        handleLogin: async (req, res) => {
            try {
                const { email, password } = req.body;
                const user = await usersCollection.findOne({ email });
                if (!user) {
                    return res.status(404).send({ message: "Utilisateur non trouvé" });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).send({ message: "Mot de passe incorrect" });
                }
                res.send({
                    message: "Connexion réussie",
                    user: {
                        id: user._id,
                        email: user.email,
                        login: user.login,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                });
            } catch (error) {
                res.status(500).send({ message: "Erreur de connexion", error: error.message });
            }
        }
    };
};
