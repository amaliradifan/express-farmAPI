const { PrismaClient } = require('@prisma/client');
const AuthorizationError = require('../../errors/AuthorizationError');

const prisma = new PrismaClient();

const isAuthor = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    throw new AuthorizationError('Invalid Token');
  }
  try {
    const produceId = req.params.id;
    const userId = req.user.id;

    const produce = await prisma.produce.findUnique({
      where: { id: produceId },
      include: { farmer: true },
    });

    if (!produce || produce.farmer.userId !== userId) {
      throw new AuthorizationError('You are not the author of this resource.');
    }

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = isAuthor;
