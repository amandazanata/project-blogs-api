const express = require('express');
const user = require('../controllers/user.controller');
const { validateToken } = require('../middlewares/token.validation');
const { validateUser } = require('../middlewares/user.validation');

const router = express.Router();

router.get('/', validateToken, user.getAllUsers); // Requisito 5: Sua aplicação deve ter o endpoint GET /user
router.get('/:id', validateToken, user.getUserById); // Requisito 6: Sua aplicação deve ter o endpoint GET /use:id
router.post('/', validateUser, user.createUser); // Requisito 4: Sua aplicação deve ter o endpoint POST /user
router.delete('/me', validateToken, user.deleteUser); // Requisito 17: Sua aplicação deve ter o endpoint DELETE /user/me

module.exports = router;