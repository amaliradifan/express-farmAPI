const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllFarmers = async (req, res) => {
  const farmers = await prisma.farmer.findMany();
  res.status(200).json({
    message: 'Success',
    data: farmers,
  });
};

module.exports = { getAllFarmers };
