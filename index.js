// Récupère les variables du fichier .env
require("dotenv").config();

const express = require("express");
const router = require("./app/router");

// middleware pour nettoyer les valeurs des propriétés de req.body
const bodySanitizer = require("./app/middlewares/bodySanitizer");

// Utilise la variable PORT du fichier .env, si aucun fichier .env le port 3000 sera utilisé
const PORT = process.env.PORT || 3000;
const app = express();

// built-in middleware d'express, sert à récuperer les données envoyés depuis un formulaire (par exemple)
app.use(express.urlencoded({ extended: true }));

// la place du middleware bodySanitizer est importante
// il doit être après express.urlencoded qui crée l'objet req.body
// dont le middleware a besoin, et avant le router, pour que les valeurs
// des propriétés de req.body soient saines avant l'enregistrement en BDD
app.use(bodySanitizer);

app.use(router);

app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
});