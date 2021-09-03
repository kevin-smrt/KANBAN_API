// Récupère seulement les classes DataTypes et Model du module sequelize
const { DataTypes, Model } = require("sequelize");
// Récupère la classe sequelize du fichier database.js
const sequelize = require("../database");

// Ajout de la classe Model sur notre classe List
class List extends Model { }

List.init(
    // Initialisation des données que va contenir la classe avec sequelize
    {
        name: DataTypes.TEXT,
        order: DataTypes.INTEGER,
    },
    {
        sequelize,
        tableName: "list",
    }
);

// Exportation de la classe List
module.exports = List;