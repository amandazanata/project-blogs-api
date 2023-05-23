const Joi = require('joi');

const categoryValidation = Joi.object().keys({
  name: Joi.string().required(),
});

const validateCategory = (req, res, next) => { // Requisito 12: Sua aplicação deve ter o endpoint POST /post
  const category = req.body;
  const { error } = categoryValidation.validate(category);
  if (error) {
    return res.status(400)
      .json({ message: error.details[0].message });
  }

  return next();
};

module.exports = {
  validateCategory,
};