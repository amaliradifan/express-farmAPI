const Joi = require('joi');
const ClientError = require('../../errors/ClientError');

const farmerSchema = Joi.object({
  name: Joi.string().required(),
});

const validate = (req, res, next) => {
  const { error } = farmerSchema.validate(req.body);

  if (error) throw new ClientError(error.message);
  next();
};

module.exports = validate;
