const { Op } = require('sequelize'); // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
const {
  BlogPost,
  Category,
  User,
  PostCategory,
  sequelize,
} = require('../models');
const { validatePost } = require('./validation/postService.validation');

const isMissingCategory = async (categories) => {
  const { count } = await Category.findAndCountAll({
    where: {
      id: categories,
    },
  });
  return (categories.length !== count);
};

const getAllPosts = async () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const getPostById = async (id) => BlogPost.findOne({ // Requisito 14: Sua aplicação deve ter o endpoint GET /post/:id
  where: { id },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const getPostByQuery = async (q) => BlogPost.findAll({ // Requisito 18: Sua aplicação deve ter o endpoint GET /post/search?q=:searchTerm
  where: {
    [Op.or]: [
      { title: { [Op.substring]: q } },
      { content: { [Op.substring]: q } },
    ],
  },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const createPost = async ({ title, content, categoryIds }, userId) => {
  if (await isMissingCategory(categoryIds)) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
  }
  try {
    const saved = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create({ userId, title, content }, { transaction: t });

      await Promise.all(categoryIds
        .map(async (categoryId) => PostCategory
          .create({ postId: newPost.id, categoryId }, { transaction: t })));

      return newPost;
    });
    return saved;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const updatePost = async ({ title, content }, id, userId) => { // Requisito 15: Sua aplicação deve ter o endpoint PUT /post/:id
  const result = await validatePost(id, userId);
  if (result) {
    return result;
  }

  const [updatedPost] = await BlogPost.update(
    { title, content },
    { where: { id, userId } },
  );
  if (updatedPost) {
    return getPostById(id);
  }

  return { type: 400, message: 'Nothing to update' };
};

const deletePost = async (id, userId) => { // Requisito 16: Sua aplicação deve ter o endpoint DELETE /post/:id
  const result = await validatePost(id, userId);
  if (result) {
    return result;
  }

  const deleted = await BlogPost.destroy({ where: { id } });

  return deleted;
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostByQuery,
  createPost,
  updatePost,
  deletePost,
};