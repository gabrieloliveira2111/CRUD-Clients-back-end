const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Clients = require('../models/Clients');
const Users = require('../models/Users');

const connection = new Sequelize(dbConfig);

Clients.init(connection);
Users.init(connection);

module.exports = connection;
