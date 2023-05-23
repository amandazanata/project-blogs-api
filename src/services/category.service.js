const { Category } = require('../models');

const getAllCategories = async () => Category.findAll();

const createCategory = async (category) => {
  const result = await Category.create(category);

  return result;
};

module.exports = {
  getAllCategories,
  createCategory,
};