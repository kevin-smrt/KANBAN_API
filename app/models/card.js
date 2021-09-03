// Récupère seulement les classes DataTypes et Model du module sequelize
const { DataTypes, Model } = require("sequelize");
// Récupère la classe sequelize du fichier database.js
const sequelize = require("../database");

// Ajout de la classe Model sur notre classe Card
class Card extends Model { }

Card.init(
    // Initialisation des données que va contenir la classe avec sequelize
    {
        name: DataTypes.TEXT,
        order: DataTypes.INTEGER,
        color: DataTypes.TEXT,
        list_id: DataTypes.INTEGER
    },
    {
        sequelize,
        tableName: "card",
    }
);

// Exportation de la classe Card
module.exports = Card;