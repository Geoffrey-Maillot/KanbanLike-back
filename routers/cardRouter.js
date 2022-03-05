const router = require('express').Router();
const authMiddleware = require('../middlewares/jwtAuthentification')
const cardController = require('../controllers/cardController')

// card
router.post('/api/card' ,authMiddleware, cardController.createCard);
router.patch('/api/card/:id', authMiddleware, cardController.updateCard);
router.delete('/api/card/:id', authMiddleware, cardController.deleteCard);

//label
router.post('/api/card/:cardId/label/:labelId', authMiddleware, cardController.addLabel)
router.delete('/api/card/:cardId/label/:labelId', authMiddleware, cardController.removeLabel)

module.exports = router;