const express = require('express');
const category = require('../controllers/category.controller');
const { validateCategory } = require('../middlewares/category.validation');
const { validateToken } = require('../middlewares/token.validation');

const router = express.Router();

router.get('/', validateToken, category.getAllCategories);// Requisito 13: Sua aplicação deve ter o endpoint GET /post
router.post('/', validateToken, validateCategory, category.createCategory); // Requisito 12: Sua aplicação deve ter o endpoint POST /post
module.exports = router;