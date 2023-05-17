const Clients = require('../models/Clients');
const { Op } = require('sequelize');
const Users = require('../models/Users');

const getClientsByAccess = async (req, res) => {
  const { access } = req.params;

  try {
    const allClients = await Clients.findAll({
      where: {
        access_level: {
          [Op.lte]: access,
        },
      },
    });
    return res.status(200).json(allClients);
  } catch (err) {
    return res.status(500).send({ erro: err });
  }
};

const createClients = async (req, res) => {
  const { access } = req.params;
  const { name, phone, email, address, postalcode } = req.body;

  try {
    if (!name || !phone || !email || !address || !postalcode) {
      return res.status(400).send({ message: 'Preencha todos os campos' });
    }

    await Clients.create({
      name,
      phone,
      email,
      address,
      postalcode,
      access_level: access,
    });
    return res.status(200).send({ message: 'Cliente cadastrado com sucesso' });
  } catch (err) {
    return res.status(500).send({ erro: err });
  }
};

const updateClients = async (req, res) => {
  const { id_client } = req.params;
  const { name, phone, email, address, postalcode, access } = req.body;

  try {
    if (!name || !phone || !email || !address || !postalcode || !access) {
      return res.status(400).send({ message: 'Preencha todos os campos' });
    }

    const getClient = await Clients.findOne({
      where: {
        id: id_client,
      },
    });

    if (!getClient) {
      return res.status(404).send({ message: 'Cliente não encontrado' });
    }

    await Clients.update(
      {
        name,
        phone,
        email,
        address,
        postalcode,
        access_level: access,
      },
      {
        where: {
          id: id_client,
        },
      }
    );
    return res.status(200).send({ message: 'Cliente atualizado com sucesso' });
  } catch (err) {
    return res.status(500).send({ erro: err });
  }
};

const deleteClients = async (req, res) => {
  const { id_client } = req.params;

  try {
    const getClient = await Clients.findOne({
      where: {
        id: id_client,
      },
    });

    if (!getClient) {
      return res.status(404).send({ message: 'Cliente não encontrado' });
    }

    await Clients.destroy({
      where: {
        id: id_client,
      },
    });
    return res.status(200).send({ message: 'Cliente excluído com sucesso' });
  } catch (err) {
    return res.status(500).send({ erro: err });
  }
};

const recoveryInfos = async (req, res) => {
  const { id_client } = req.params;
  try {
    const userInfos = await Clients.findOne({
      where: {
        id: id_client,
      },
    });

    const accessInfo = await Users.findAll({
      attributes: ['access_level'],
    });

    const results = {
      user: userInfos,
      access: accessInfo,
    };

    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
};

module.exports = {
  getClientsByAccess,
  createClients,
  updateClients,
  deleteClients,
  recoveryInfos,
};
