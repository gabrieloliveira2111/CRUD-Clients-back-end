const { Model, DataTypes } = require('sequelize');

class Users extends Model {
  static init(connection) {
    super.init(
      {
        username: DataTypes.STRING,
        access_level: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Users;
