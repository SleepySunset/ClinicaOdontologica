const { sequelize } = require("../config/mysql");
const { DataTypes } = require("sequelize");

const Odontologo = sequelize.define("odontologo", {
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  apellido: {
    type: DataTypes.STRING,
  },
});

module.exports = Odontologo;
