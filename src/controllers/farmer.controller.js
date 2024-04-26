const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllFarmers = async (req, res) => {
  const farmers = await prisma.farmer.findMany();
  res.status(200).json({
    message: 'Success',
    data: farmers,
  });
};

const addFarmer = async (req, res) => {
  const { name } = req.body;

  const farmer = await prisma.farmer.create({
    data: {
      name,
    },
  });

  res.status(201).json({
    message: 'Success',
    data: farmer,
  });
};

module.exports = { getAllFarmers, addFarmer };
