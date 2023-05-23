const { Category } = require('../models');

const getAllCategories = async () => Category.findAll(); // Requisito 9: Sua aplicação deve ter o endpoint GET /categories

const createCategory = async (category) => { // Requisito 8: Sua aplicação deve ter o endpoint POST /categories
  const result = await Category.create(category);

  return result;
};

module.exports = {
  getAllCategories,
  createCategory,
};