const router = require('express').Router();
const Controller = require('../controllers/admin_login.controller');

router.post('/', Controller.login);

module.exports = router;
