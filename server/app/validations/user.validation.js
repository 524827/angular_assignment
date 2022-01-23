const Joi = require("joi");

module.exports = {
  createUserValidation: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
  }),

  updateUserValidation: Joi.object({
    id: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  }),

  paramsValidation:  Joi.object({
    id: Joi.string().required(),
  })

};
