// Je crée mon router
const router = require('express').Router();

// J'importe mon controller
const listController = require('../controllers/listController')

// J'importe le midlleware qui me permet de vérifier la validité du Token
const authMiddleware = require('../middlewares/jwtAuthentification')

router.get('/api/list/:id', authMiddleware, listController.getList);
router.post('/api/list', authMiddleware, listController.createList);
router.patch('/api/list/:id', authMiddleware, listController.updateList);
router.delete('/api/list/:id', authMiddleware, listController.deleteList);

module.exports = router;