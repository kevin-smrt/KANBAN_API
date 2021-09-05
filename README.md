# 🖥 API KANBAN (trello like)

## 🎯 But du projet
Créer une API (CRUD) REST et la documenter.
- On souhaite créer une application de type Kanban où il est possible de créer des cartes à l'intérieur de listes.
- L'utilisateur peut créer autant de listes qu'il désire et mettre autant de cartes à l'intérieur de ces listes.
- Chaque liste dispose d'un nom.
- Chaque carte dispose d'un titre, d'une position au sein de la liste, d'une couleur (optionnelle) et d'un ou plusieurs label(s) (optionnel(s))

## ⌨️ Les dépendances
`sanitizer` `express` `sequelize` `pg` `dotenv`

## 📑 Les étapes
Commencer par créer une base de données. Tout le processus est résumé dans [ce projet](https://github.com/kevin-smrt/DB-CONCEPT/blob/master/GDP.md).

Une fois que la base de données est prête on peut s'attaquer au code javascript.
La première étape est de mettre en place l'architecture "classique" d'un projet MVC (models, views, controllers).

Ensuite, créer les modèles qui vont être utilisés par `sequelize` ainsi que les associations.

Créer un fichier index.js pour instancier le serveur `express` avec toutes les informations necessaire à son bon fonctionnement.

S'en suit l'étape de création des routes tout en respectant les principes de l'architecture REST.

Il faut ensuite tester les routes pour s'assurer de leurs fonctionnement. POSTMAN ou l'extention VSCode `VSC REST client` sont très utiles pour cette étape.

Un futur projet *front* en `REACT` sera disponible pour consommer cette API.

## 📍 Conclusion
Savoir créer une API CRUD en partant de zero, de sa conceptualisation à sa réalisation, tout en respectant les principes de l'architecture REST.