// Je crée mon router
const router = require('express').Router();


const labelController = require('../controllers/labelController')

// J'importe le midlleware qui me permet de vérifier la validité du Token
const authMiddleware = require('../middlewares/jwtAuthentification')


router.get('/api/label', authMiddleware, labelController.getLabel);
router.post('/api/label', authMiddleware, labelController.createLabel);
router.patch('/api/label/:id', authMiddleware, labelController.updateLabel);
router.delete('/api/label/:id', authMiddleware, labelController.deleteLabel);

module.exports = router;