const { check } = require("express-validator");
const {validateResults} = require("../utils/handleValidator");

const validatorCreatePaciente = [
  check("nombre").exists().notEmpty(),
  check("apellido").exists().notEmpty(),
  check("dni").exists().notEmpty(),
  check("fechaIngreso").exists().notEmpty(),
  check("domicilio_id").exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];

const validatorGetPaciente = [
  check("id").exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];


module.exports = { validatorCreatePaciente, validatorGetPaciente };