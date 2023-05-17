require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).send({ error: 'nenhum token fornecido' });
  }
  const parts = authToken.split(' ');

  if (!parts.length === 2) {
    return res.status(401).send({ error: 'token inválido' });
  }

  const [bearer, token] = parts;

  if (!/^Bearer$/i.test(bearer)) {
    return res.status(401).send({ error: 'token inválido' });
  }

  try {
    jwt.verify(token, process.env.TOKEN_SECRET);
    return next();
  } catch (err) {
    return res.status(401).send({ message: err });
  }
};
