const { sequelize } = require("../config/mysql");
const { DataTypes } = require("sequelize");

const Turno = sequelize.define("turno", {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  paciente_id: {
    type: DataTypes.INTEGER,
  },
  odontologo_id: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Turno;
