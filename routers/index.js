// Je crée mon router
const router = require('express').Router();

// J'importe mes différents router 
const authRouter = require('./authRouter');
const listRouter = require('./listRouter')
const cardRouter = require('./cardRouter')
const labelRouter = require('./labelRouter')

// Importe le controller qui gère les erreurs
const errorsMiddlewares = require('../controllers/errorsMiddlewares');

// J'utilise mes router
router.use(authRouter);
router.use(listRouter);
router.use(cardRouter);
router.use(labelRouter);

// S'il y a une erreur 404, on arrivera a ce middleware
router.use(errorsMiddlewares.error404);
// S'il y a une erreur 500, on arrivera a ce middleware
router.use(errorsMiddlewares.error500);


module.exports = router;