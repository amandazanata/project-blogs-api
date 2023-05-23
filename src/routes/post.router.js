const express = require('express');
const blogPost = require('../controllers/blogPost.controller');
const { validatePost, validateUpdate } = require('../middlewares/post.validation');
const { validateToken } = require('../middlewares/token.validation');

const router = express.Router();

router.get('/search', validateToken, blogPost.getPostByQuery); // Requisito 18: Sua aplicação deve ter o endpoint GET /post/search?q=:searchTerm
router.get('/', validateToken, blogPost.getAllPosts); // Requisito 9: Sua aplicação deve ter o endpoint GET /categories
router.get('/:id', validateToken, blogPost.getPostById); // Requisito 14: Sua aplicação deve ter o endpoint GET /post/:id
router.post('/', validateToken, validatePost, blogPost.createPost); // Requisito 8: Sua aplicação deve ter o endpoint POST /categories
router.put('/:id', validateToken, validateUpdate, blogPost.updatePost); // Requisito 15: Sua aplicação deve ter o endpoint PUT /post/:id
router.delete('/:id', validateToken, blogPost.deletePost); // Requisito 16: Sua aplicação deve ter o endpoint DELETE /post/:id

module.exports = router;