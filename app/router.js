// Récupère la classe Router du module express
const { Router } = require("express");

// Récuperation des différents controllers
const listController = require("./controllers/listController");
const cardController = require("./controllers/cardController");
const tagController = require("./controllers/tagController");

// Initialisation du router
const router = Router();

// Route racine
router.get("/", (req, res) => {
    res.send("hello world !");
});

/* Routes des listes */

// Récupère toute les listes
router.get("/lists", listController.getAllLists);

// Récupère une liste
router.get("/lists/:id", listController.getOneList);

// Crée une liste
router.post("/lists", listController.createList);

// Modifie une liste
router.patch("/lists/:id", listController.modifyList);

// Crée ou modifie une liste
router.put("/lists/:id?", listController.createOrModifyList);

// Supprime une liste
router.delete("/lists/:id", listController.deleteList);


/* Routes des cartes */

// Récupère toute les cartes
router.get("/lists/:id/cards", cardController.getAllCards);

// Récupère une carte
router.get("/cards/:id", cardController.getOneCard);

// Crée une carte
router.post("/cards", cardController.createCard);

// Modifie une carte
router.patch("/cards/:id", cardController.modifyCard);

// Crée ou modifie une carte
router.put("/cards/:id?", cardController.createOrModifyCard);

// Supprimer une carte
router.delete("/cards/:id", cardController.deleteCard);

/* Associations */

// Associe un tag à une carte
router.post("/cards/:cardId/tag/", tagController.associateTagToCard);

// Dissocie un tag d'une carte
router.delete("/cards/:cardId/tag/:tagId", tagController.dissociateTagFromCard);

/* Routes des tags */

// Récupère tout les tags
router.get("/tags", tagController.getAllTags);

// Crée un tag
router.post("/tags", tagController.createTag);

// Modifie un tag
router.patch("/tags/:id", tagController.modifyTag);

// Crée ou modifie un tag
router.put("/tags/:id?", tagController.createOrModifyTag);

// Supprime un tag
router.delete("/tags/:id", tagController.deleteTag);

// Si aucune route n'est trouvée => 404
router.use((req, res) => {
    res.status(404).send("This service doesn't exist");
});

module.exports = router;