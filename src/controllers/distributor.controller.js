const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllDistributors = async (req, res) => {
  const distributors = await prisma.farmer.findMany();
  res.status(200).json({
    message: 'Success',
    data: distributors,
  });
};

module.exports = { getAllDistributors };
