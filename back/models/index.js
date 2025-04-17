const Paciente = require("./paciente");
const Turno = require("./turno");
const Odontologo = require("./odontologo");
const Domicilio = require("./domicilio");


Paciente.belongsTo(Domicilio, {
  foreignKey: "domicilio_id",
  as: "domicilio",
});

Paciente.hasMany(Turno, {
  foreignKey: "paciente_id",
  as: "turnos",
});

Turno.belongsTo(Paciente, {
  foreignKey: "paciente_id",
  as: "paciente",
});


Odontologo.hasMany(Turno, {
  foreignKey: "odontologo_id",
  as: "turnos",
});

Turno.belongsTo(Odontologo, {
  foreignKey: "odontologo_id",
  as: "odontologo",
});

module.exports = {
  Paciente,
  Turno,
  Odontologo,
  Domicilio,
};
