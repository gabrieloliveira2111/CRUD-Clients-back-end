require('dotenv').config();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

const auth = async (req, res) => {
  const { user = '' } = req.body;

  try {
    if (!user) {
      return res.status(401).json({ message: 'Usuário necessário' });
    }
    const username = await User.findOne({ where: { username: user } });

    if (!username) {
      return res.status(400).json({ message: 'Usuário incorreto' });
    }

    const { dataValues } = username;

    const token = jwt.sign({ dataValues }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.status(200).json({
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      erro: err.message,
    });
  }
};

module.exports = { auth };
