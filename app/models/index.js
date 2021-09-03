// Récupère les différentes classes
const List = require("./list");
const Card = require("./card");
const Tag = require("./tag");

/* Associations */

// Une carte appartient à une liste
Card.belongsTo(List, {
  as: "list",
  foreignKey: "list_id",
});

// Une liste possède plusieurs cartes
List.hasMany(Card, {
  as: "cards",
  foreignKey: "list_id",
});

// Une carte peut posseder plusieurs tags
Card.belongsToMany(Tag, {
  as: "tags",
  through: "card_has_tag",
  foreignKey: "card_id",
  otherKey: "tag_id",
  timestamps: false,
});

// Un tag peut appartenir à plusieurs cartes
Tag.belongsToMany(Card, {
  as: "cards",
  through: "card_has_tag",
  foreignKey: "tag_id",
  otherKey: "card_id",
  timestamps: false,
});

// Une fois les associations définis les classes sont exportées
module.exports = { Card, List, Tag };