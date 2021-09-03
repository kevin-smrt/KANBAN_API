// Récupère le module sanitizer
const sanitizer = require("sanitizer");

const bodySanitizer = (req, res, next) => {
    if (req.body) {
        // Si la requête a une propriété body
        for (let propName in req.body) {
            // J'énumére les noms des propriétés de req.body et je nettoie leur valeur
            req.body[propName] = sanitizer.escape(req.body[propName]);
        }
    }
    // j'indique qu'il est tant de passer au middleware suivant
    next();
};

module.exports = bodySanitizer;