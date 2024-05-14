const jwt = require('jsonwebtoken');
const AuthorizationError = require('../../errors/AuthorizationError');

const isLoggedIn = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    throw new AuthorizationError('Invalid Token');
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = isLoggedIn;
