const router = require('express').Router();
const Controller = require('../controllers/category.controller');

router.get('/', Controller.getAll);
router.get('/:id', Controller.getDetail);
router.post('/', Controller.create);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.delete);

module.exports = router;
