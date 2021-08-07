const router = require('express').Router();
const Controller = require('../controllers/project.controller');
const auth = require('../middlewares/auth');

router.get('/', Controller.getAll);
router.get('/:id', Controller.getDetail);

router.use(auth.authentication);
router.post('/', Controller.create);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.delete);

module.exports = router;
