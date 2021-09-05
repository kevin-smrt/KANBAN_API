// Récupère la classe Tag
const { Tag } = require("../models");

const tagController = {
    // Méthode pour renvoyer tous les tags
    getAllTags: async (req, res) => {
        try {
            // Récupère les tags depuis la base de données
            const tags = await Tag.findAll();
            // Puis renvoie les résultats reçus en JSON
            res.json(tags);
        } catch (error) {
            // en cas d'erreur, on l'affiche dans la console
            console.trace(error);
            // et la renvoie au client
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour crée un tag
    createTag: async (req, res) => {
        try {
            // Récupère name et color depuis le corps (body) de la requête
            const { name, color } = req.body;
            if (!name) {
                // Si name n'a pas de valeur, renvoie une erreur au client et le code s'arrête
                return res.status(400).json("name can't be empty");
            }
            // Sinon crée (localement) un nouveau tag
            const newTag = Tag.build({
                name,
            });
            // Si color a une valeur, l'assigne au tag
            newTag.color = color || newTag.color;
            // Sauve notre nouveau tag dans la base de données
            await newTag.save();
            // Renvoie le nouveau tag au format JSON
            res.json(newTag);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour modifier un tag
    modifyTag: async (req, res) => {
        try {
            // Récupère l'id du tag à modifier dans la route
            const tagId = req.params.id;
            // Récupère name et color depuis le corps (body) de la requête
            const { name, color } = req.body;
            // Récupère le tag depuis la base de données
            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                return res.status(404).json("can't find a tag with id: " + tagId);
            }

            tag.name = name || tag.name;
            tag.color = color || tag.color;

            // Sauvegarde notre tag modifié dans la base de données
            await tag.save();
            // Renvoie le tag modifié au format JSON
            res.json(tag);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour créer ou modifier un tag
    createOrModifyTag: async (req, res) => {
        try {
            let tag;
            if (req.params.id) {
                // Si un id est passé via la route, je le récupère
                const tagId = req.params.id;
                // Je récupère le tag correspondant depuis la base de données
                tag = await Tag.findByPk(tagId);
            }
            // Si un tag est trouvée on le modifie
            if (tag) {
                await tagController.modifyTag(req, res);
            } else { // Sinon on le créé
                await tagController.createTag(req, res);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour supprimer un tag
    deleteTag: async (req, res) => {
        try {
            const tagId = req.params.id;
            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                return res.status(404).json("Can't delete a tag with id: " + tagId);
            }
            await tag.destroy();
            res.json("ok");
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour associer un tag et une carte
    associateTagToCard: async (req, res) => {
        try {
            // Récupère l'id de la carte depuis la route
            const cardId = req.params.cardId;
            // Récupère l'id du tag depuis le corps de la requète
            const tagId = req.body.tag_id;
            // Récupère la carte correspondante depuis la base de données
            let card = await Card.findByPk(cardId, {
                include: ["tags"],
            });
            if (!card) {
                // si carte n'a pas de valeur, renvoie une erreur au client et le code s'arrête
                return res.status(404).json("Can't find a card with id: " + cardId);
            }
            // sinon récupère le tag correspondant depuis la base de données
            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                // Si tag n'a pas de valeur, renvoie une erreur au client et le code s'arrête
                return res.status(404).json("Can't find a tag with id: " + tagId);
            }
            // Sinon, associe carte et tag
            await card.addTag(tag);
            // Récupère la carte associée
            card = await Card.findByPk(cardId, {
                include: ["tags"],
            });
            // Renvoie au client de la carte avec le nouveau tag
            res.json(card);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour dissocier une carte et un tag 
    dissociateTagFromCard: async (req, res) => {
        try {
            // Récupère les ids de la carte et du tag depuis la route
            const { cardId, tagId } = req.params;
            // Récupère la carte correspondante depuis la base de données
            let card = await Card.findByPk(cardId);
            if (!card) {
                // Si carte n'a pas de valeur, renvoie une erreur au client et le code s'arrête
                return res.status(404).json("Can't find a card with id: " + cardId);
            }
            // Sinon, récupère le tag correspondant depuis la base de données
            let tag = await Tag.findByPk(tagId);
            if (!tag) {
                // Si tag n'a pas de valeur, renvoie une erreur au client et le code s'arrête
                return res.status(404).json("Can't find a tag with id: " + tagId);
            }
            // Sinon, dissocie la carte et le tag
            await card.removeTag(tag);
            // Récupère la carte dissociée du tag
            card = await Card.findByPk(cardId, {
                include: ["tags"],
            });
            // Et on la renvoie au client
            res.json(card);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
};
