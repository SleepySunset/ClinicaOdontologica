const { check } = require("express-validator");
const {validateResults} = require("../utils/handleValidator");
const { Paciente } = require("../models");
const { Odontologo } = require("../models");

const validatorCreateTurno = [
  check("fecha").exists().notEmpty(),
  check("paciente_id").exists().notEmpty().custom(async (value) => {
    const paciente = await Paciente.findByPk(value);
    if (!paciente) {
      throw new Error("El paciente_id no existe en la base de datos");
    }
    return true;
  }),
  check("odontologo_id").exists().notEmpty().custom(async (value) => {
    const odontologo = await Odontologo.findByPk(value);
    if (!odontologo) {
      throw new Error("El odontologo_id no existe en la base de datos");
    }
    return true;
  }),
  (req, res, next) => validateResults(req, res, next),
];

const validatorGetTurno = [
  check("id").exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];


module.exports = { validatorCreateTurno, validatorGetTurno };