const { sequelize } = require("../config/postgres");
const { DataTypes } = require("sequelize");

const Paciente = sequelize.define("paciente", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
  },
  dni: {
    type: DataTypes.STRING,
  },
  fechaIngreso: {
    type: DataTypes.DATE,
  },
  domicilio_id: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Paciente;
