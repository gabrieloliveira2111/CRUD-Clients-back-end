const express = require('express');
const ClientsController = require('./controllers/Clients');
const AuthController = require('./controllers/Auth');
const VerifyToken = require('../src/middlewares/VerifyToken');
const routes = express.Router();

routes.post('/auth', AuthController.auth);

routes.get(
  '/clients/:access',
  VerifyToken,
  ClientsController.getClientsByAccess
);
routes.post('/clients/:access', VerifyToken, ClientsController.createClients);
routes.put('/clients/:id_client', VerifyToken, ClientsController.updateClients);
routes.delete(
  '/clients/:id_client',
  VerifyToken,
  ClientsController.deleteClients
);

routes.get(
  '/recovery/client/:id_client',
  VerifyToken,
  ClientsController.recoveryInfos
);

module.exports = routes;
