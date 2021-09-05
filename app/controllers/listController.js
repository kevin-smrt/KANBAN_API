// Récupère la classe List
const { List } = require("../models");

const listController = {
    // Méthode pour récupérer toute les listes
    getAllLists: async (req, res) => {
        try {
            // Récupère toute les listes, incluant les cartes et les tags
            const lists = await List.findAll({
                include: {
                    association: "cards",
                    include: "tags",
                },
                order: [
                    ["order", "ASC"],
                    ["cards", "order", "ASC"],
                ],
            });
            // Le résultat est renvoyé au format JSON
            res.json(lists);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour récupérer une liste
    getOneList: async (req, res) => {
        try {
            const listId = req.params.id;
            // Récupère la liste avec les cartes et les tags
            const list = await List.findByPk(listId, {
                include: {
                    association: "cards",
                    include: "tags",
                },
                order: [["cards", "order", "ASC"]],
            });
            if (list) {
                res.json(list);
            } else {
                res.status(404).json("There is no list with id: " + listId);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour créer une liste
    createList: async (req, res) => {
        try {
            // Récupère les données envoyées par le formulaire
            const { name, order } = req.body;
            if (!name) {
                res.status(400).json("name can not be empty");
            } else {
                const newList = List.build({
                    name,
                    order,
                });

                // La nouvelle liste est enregistrée dans la base de données
                await newList.save();
                // Elle est ensuite renvoyée au format JSON
                res.json(newList);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour modifier une liste
    modifyList: async (req, res) => {
        try {
            const listId = req.params.id;
            const list = await List.findByPk(listId);
            if (!list) {
                res.status(404).json("There is no list with id: " + listId);
            } else {
                // Récupère les données du formulaire
                const { name, order } = req.body;

                list.name = name || list.name;
                list.order = parseInt(order) || list.order;

                // Sauvegarde la nouvelle liste dans la base de données
                await list.save();
                // Renvoie le résultat au format JSON
                res.json(list);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour définir si une liste doit être modifiée ou créée
    createOrModifyList: async (req, res) => {
        try {
            let list;
            if (req.params.id) {
                list = await List.findByPk(req.params.id);
            }

            // Si une liste a été trouvée
            if (list) {
                await listController.modifyList(req, res);
            } else { // Si aucune liste n'a été trouvée
                await listController.createList(req, res);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    // Méthode pour supprimer une liste
    deleteList: async (req, res) => {
        try {
            const listId = req.params.id;
            const list = await List.findByPk(listId);
            await list.destroy();
            res.json("ok");
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
};
