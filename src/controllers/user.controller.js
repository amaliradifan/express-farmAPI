const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const ClientError = require('../errors/ClientError');

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json({
    message: 'Success',
    data: users,
  });
};

const register = async (req, res) => {
  const {
    email, password, name, role,
  } = req.body;
  const isUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUser) {
    throw new ClientError('User sudah terdaftar');
  }

  const newPassword = await bcrypt.hash(password, 10);
  let user;
  if (role === 'FARMER') {
    // Create user with Farmer role
    user = await prisma.user.create({
      data: {
        email,
        password: newPassword,
        name,
        role,
        farmer: {
          create: {
            name: `${name}'s Farm`,
          },
        },
      },
    });
  } else if (role === 'DISTRIBUTOR') {
    // Create user with Distributor role
    user = await prisma.user.create({
      data: {
        email,
        password: newPassword,
        name,
        role,
        distributor: {
          create: {
            name: `${name}'s Distribution`,
          },
        },
      },
    });
  }

  res.status(201).json({ message: 'Success', data: user });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ClientError('User tidak ditemukan');
  }

  res.status(200).json({
    message: 'Success',
    data: user,
  });
};

module.exports = { getAllUsers, register, getUserById };
