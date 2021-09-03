// Récupère seulement la classe Sequelize du module sequelize
const { Sequelize } = require("sequelize");

// Création d'une instance de classe sequelize
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Exportation de notre classe
module.exports = sequelize;