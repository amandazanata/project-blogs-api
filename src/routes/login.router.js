const express = require('express');
const { validateLogin } = require('../middlewares/login.validation');
const login = require('../controllers/user.controller');

const router = express.Router();

// Requisito 3: Sua aplicação deve ter o endpoint POST /login
router.post('/', validateLogin, login.getLogin);

module.exports = router;