/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const ClientError = require('../errors/ClientError');

module.exports = (error, req, res, next) => {
  if (error instanceof ClientError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  res.status(500).json({ message: error.message });
};
