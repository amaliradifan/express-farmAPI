const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const AuthorizationError = require('../../errors/AuthorizationError');

const prisma = new PrismaClient();

const isFarmer = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    throw new AuthorizationError('Invalid Token');
  }
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (user.role !== 'FARMER') {
      throw new AuthorizationError('Access denied. User does not have the FARMER role.');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = isFarmer;
