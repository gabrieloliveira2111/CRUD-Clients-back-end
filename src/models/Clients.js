const { Model, DataTypes } = require('sequelize');

class Clients extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        postalcode: DataTypes.STRING,
        access_level: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Clients;
