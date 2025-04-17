const { sequelize } = require("../config/postgres");
const { DataTypes } = require("sequelize");

const Domicilio = sequelize.define("domicilio", {
  calle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.INTEGER,
  },
  localidad: {
    type: DataTypes.STRING,
  },
  provincia: {
    type: DataTypes.STRING,
  },
});

module.exports = Domicilio;
