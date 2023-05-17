require('dotenv').config();
const path = require('path');

module.exports = {
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../Database/sqlite.db'),
  define: {
    timestamps: false,
  },
};
