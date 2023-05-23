const blogPostService = require('../services/blogPost.service');

const getAllPosts = async (_req, res) => {
  const result = await blogPostService.getAllPosts();

  return res.status(200).json(result);
};

const getPostById = async (req, res) => { // Requisito 14: Sua aplicação deve ter o endpoint GET /post/:id
  const { id } = req.params;
  const result = await blogPostService.getPostById(id);
  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(result);
};

const getPostByQuery = async (req, res) => { // Requisito 18: Sua aplicação deve ter o endpoint GET /post/search?q=:searchTerm
  const { q } = req.query;
  const result = await blogPostService.getPostByQuery(q);

  return res.status(200).json(result);
};

const createPost = async (req, res) => {
  const { id } = req.user;
  const post = req.body;

  const result = await blogPostService.createPost(post, id);
  if (result.type) {
    return res.status(result.type).json({ message: result.message });
  }

  return res.status(201).json(result);
};

const updatePost = async (req, res) => { // Requisito 15: Sua aplicação deve ter o endpoint PUT /post/:id
  const { id } = req.params;
  const post = req.body;

  const result = await blogPostService.updatePost(post, id, req.user.id);
  if (result.type) {
    return res.status(result.type).json({ message: result.message });
  }
  return res.status(200).json(result);
};

const deletePost = async (req, res) => { // Requisito 16: Sua aplicação deve ter o endpoint DELETE /post/:id
  const { id } = req.params;

  const result = await blogPostService.deletePost(id, req.user.id);

  if (result.type) {
    return res.status(result.type).json({ message: result.message });
  }
  return res.status(204).end();
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostByQuery,
  createPost,
  updatePost,
  deletePost,
};