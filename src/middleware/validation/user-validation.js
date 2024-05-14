const Joi = require('joi');
const ClientError = require('../../errors/ClientError');

const userSchema = Joi.object({
  email: Joi.string().email().required(), // Ensure valid email format
  password: Joi.string().min(8).required(), // Enforce minimum password length
  name: Joi.string().required(),
  role: Joi.string().valid('FARMER', 'DISTRIBUTOR').required(), // Validate specific roles
  // Conditional validation based on role:
  farmer: Joi.when('role', {
    is: 'FARMER',
    then: Joi.object({
      name: Joi.string().required(), // Farmer-specific field
    }),
  }),
  distributor: Joi.when('role', {
    is: 'DISTRIBUTOR',
    then: Joi.object({
      name: Joi.string().required(), // Distributor-specific field (optional)
    }),
  }),
});

const validate = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) throw new ClientError(error.message);
  next();
};

module.exports = validate;
