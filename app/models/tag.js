// Récupère seulement les classes DataTypes et Model du module sequelize
const { DataTypes, Model } = require("sequelize");
// Récupère la classe sequelize du fichier database.js
const sequelize = require("../database");

// Ajout de la classe Model sur notre classe Tag
class Tag extends Model { }

Tag.init(
    // Initialisation des données que va contenir la classe avec sequelize
    {
        name: DataTypes.TEXT,
        color: DataTypes.TEXT
    },
    {
        sequelize,
        tableName: "tag",
    }
);

// Exportation de la classe Tag
module.exports = Tag;