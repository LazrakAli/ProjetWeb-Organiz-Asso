# Organiz'asso

Organiz'asso est une plateforme interactive dédiée aux membres d'une association pour échanger des messages via des forums. Elle est conçue pour faciliter la communication au sein de l'association et entre ses membres.

## Fonctionnalités

- **Forums de discussion** : Deux forums sont disponibles :
  - **Forum Ouvert** : Accessible à tous les membres pour poster et consulter des messages.
  - **Forum Fermé** : Exclusivement réservé aux membres du conseil d'administration.

- **Gestion des membres** : Les utilisateurs peuvent s'inscrire et doivent être validés par un administrateur pour devenir membres actifs.

- **Interaction des membres** :
  - Création de messages en réponse ou pour démarrer de nouvelles discussions.
  - Visualisation et gestion de leur propre profil, y compris la suppression de leurs messages.
  - Consultation des profils d'autres membres.
  - Recherche de messages par mots-clés, auteurs ou intervalle de temps.

- **Administration** :
  - Accès au forum fermé.
  - Gestion des statuts des utilisateurs, y compris l'attribution ou le retrait du statut d'administrateur.
  - Validation des inscriptions des nouveaux utilisateurs.

## Technologies Utilisées

- **Frontend** : React.js
- **Backend** : Node.js avec Express
- **Base de données** : MongoDB (supposée, à confirmer ou spécifier)
- **Authentification** : JWT pour la gestion des sessions

## Installation

Pour mettre en place et exécuter Organiz'asso localement, suivez les étapes suivantes :

### Prérequis

- Node.js
- npm (Node Package Manager)

### Clonage du projet

```bash
git clone https://github.com/votre_username/Organizasso.git
cd Organizasso


# Installer les dépendances du serveur
npm install

# Installer les dépendances du client
cd client
npm install


# Retourner à la racine du projet si vous êtes dans le répertoire client
cd ..

# Démarrer le serveur et le client
npm start

Le serveur backend sera lancé sur http://localhost:3000 et le client sur http://localhost:5173.
Après avoir démarré l'application, naviguez vers http://localhost:5173 pour accéder à l'interface utilisateur d'Organiz'asso.


