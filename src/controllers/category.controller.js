const categoryService = require('../services/category.service');

const getAllCategories = async (_req, res) => { // Requisito 9: Sua aplicação deve ter o endpoint GET /categories
  const allCategories = await categoryService.getAllCategories();

  return res.status(200).json(allCategories);
};

const createCategory = async (req, res) => { // Requisito 8: Sua aplicação deve ter o endpoint POST /categories
  const category = req.body;
  const result = await categoryService.createCategory(category);
  if (result) {
    return res.status(201).json(result);
  }
  return res.status(409).json({ message: 'Category already registered' });
};

module.exports = {
  getAllCategories,
  createCategory,
};