const express = require('express');
const user = require('../controllers/user.controller');
const { validateToken } = require('../middlewares/token.validation');
const { validateUser } = require('../middlewares/user.validation');

const router = express.Router();

router.get('/', validateToken, user.getAllUsers);
router.get('/:id', validateToken, user.getUserById);
router.post('/', validateUser, user.createUser);
router.delete('/me', validateToken, user.deleteUser);

module.exports = router;