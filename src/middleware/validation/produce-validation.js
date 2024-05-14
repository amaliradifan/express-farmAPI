const Joi = require('joi');
const ClientError = require('../../errors/ClientError');

const produceSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().integer().min(0).required(),
  farmerId: Joi.string(),
});

const validate = (req, res, next) => {
  const { error } = produceSchema.validate(req.body);

  if (error) throw new ClientError(error.message);
  next();
};

module.exports = validate;
