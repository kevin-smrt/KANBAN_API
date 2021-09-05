// Récupère la classe Card
const { Card } = require("../models");

const cardController = {
    // Méthode pour récupérer toutes les cartes
    getAllCards: async (req, res) => {
        try {
            const listId = req.params.id;
            // Récupère les cartes associés à l'id de la liste passé en paramètre, en y incluant les tags
            const cards = await Card.findAll({
                where: {
                    list_id: listId,
                },
                include: "tags",
                order: [["order", "ASC"]],
            });
            if (!cards) {
                return res.status(404).json("Can't find cards with list ID: " + listId);
            }
            // Si tout est bon, les cartes sont renvoyées au format JSON
            res.json(cards);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour récupérer une carte
    getOneCard: async (req, res) => {
        try {
            const cardId = req.params.id;
            const card = await Card.findByPk(cardId, {
                include: "tags",
            });
            if (!card) {
                return res.status(404).json("Can't find a card with id: " + cardId);
            }
            // Si tout est bon, la carte est renvoyée au format JSON
            res.json(card);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour créer une carte
    createCard: async (req, res) => {
        try {
            // Récupère les informations présentes dans le formulaire d'envoie
            const { name, color, order, list_id } = req.body;
            // Création d'un tableau d'erreur
            const bodyErrors = [];
            if (!name) {
                bodyErrors.push("name can't be empty");
            }
            if (!list_id) {
                bodyErrors.push("listId can't be empty");
            }
            // Si le tableau contient une erreur, le code s'arrête et renvoi les erreurs au format JSON
            if (bodyErrors.length) {
                return res.status(400).json(bodyErrors);
            }
            const newCard = Card.build({
                name,
                list_id,
            });

            newCard.color = color || newCard.color;
            newCard.order = order || newCard.order;

            // Sauvegarde de la carte dans la base de données
            await newCard.save();
            // Renvoie les données de la nouvelle carte au format JSON
            res.json(newCard);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour modifier une carte
    modifyCard: async (req, res) => {
        try {
            const cardId = req.params.id;
            // Récupère les informations présentes dans le formulaire d'envoie
            const { name, color, order, list_id } = req.body;

            const card = await Card.findByPk(cardId, {
                include: ["tags"],
            });
            if (!card) {
                return res.status(404).json("can't find à card with id: " + cardId);
            }

            card.name = name || card.name;
            card.color = color || card.color;
            card.order = order || card.order;
            card.list_id = list_id || card.list_id;

            // Sauvegarde de la carte dans la base de données
            await card.save();
            // Renvoie les données de la nouvelle carte au format JSON
            res.json(card);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour détérminer si la carte doit être modifiée ou créée
    createOrModifyCard: async (req, res) => {
        try {
            let card;
            if (req.params.id) {
                const cardId = req.params.id;
                card = await Card.findByPk(cardId);
            }
            // Si la carte existe, elle est modifiée
            if (card) {
                await cardController.modifyCard(req, res);
            } else { // Sinon elle est créée
                await cardController.createCard(req, res);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour supprimer une carte
    deleteCard: async (req, res) => {
        try {
            const cardId = req.params.id;
            const card = await Card.findByPk(cardId);
            if (!card) {
                res.status(404).json("Can't delete a card with id: " + cardId);
            } else {
                await card.destroy();
                res.json("ok");
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
};

module.exports = cardController;