const { PrismaClient } = require('@prisma/client');
const ClientError = require('../errors/ClientError');

const prisma = new PrismaClient();

const getAllProduce = async (req, res) => {
  const { q } = req.query;
  const produces = await prisma.produce.findMany({
    include: {
      farmer: {
        select: {
          name: true,
        },
      },
    },
    where: {
      name: {
        contains: q,
        mode: 'insensitive',
      },
    },
  });
  res.status(200).json({
    message: 'Success',
    data: produces,
  });
};

const getProduceById = async (req, res) => {
  const { id } = req.params;

  const produce = await prisma.produce.findUnique({
    where: {
      id,
    },
  });
  if (!produce) {
    throw new ClientError('Produce Not Found', 404);
  }

  res.status(200).json({
    message: 'Success',
    data: produce,
  });
};

const addProduce = async (req, res) => {
  const { name, quantity } = req.body;
  const farmer = await prisma.farmer.findUnique({
    where: {
      userId: req.user.id,
    },
  });

  const produce = await prisma.produce.create({
    data: {
      name,
      quantity,
      farmerId: farmer.id,
    },
  });

  res.status(201).json({ message: 'Success', data: produce });
};

const updateProduce = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, farmerId } = req.body;

  const updatedProduce = await prisma.produce.update({
    where: {
      id,
    },
    data: {
      name,
      quantity,
      farmerId,
    },
  });

  res.status(200).json({ message: 'Success', data: updatedProduce });
};

const deleteProduce = async (req, res) => {
  const { id } = req.params;
  const deletedProduce = await prisma.produce.delete({
    where: {
      id,
    },
  });

  res.status(200).json({ message: 'Success', data: deletedProduce });
};

const getProducesByFarmer = async (req, res) => {
  const { farmerId } = req.params;

  const produces = await prisma.produce.findMany({
    where: {
      farmerId,
    },
    include: {
      farmer: {
        select: {
          name: true,
        },
      },
    },
  });

  res.status(200).json({
    message: 'Success',
    data: produces,
  });
};

module.exports = {
  getAllProduce, getProduceById, addProduce, deleteProduce, updateProduce, getProducesByFarmer,
};
