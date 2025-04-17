const { check } = require("express-validator");
const {validateResults} = require("../utils/handleValidator");

const validatorCreateOdontologo = [
  check("matricula").exists().notEmpty(),
  check("nombre").exists().notEmpty(),
  check("apellido").exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];

const validatorGetOdontologo = [
  check("id").exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];


module.exports = { validatorCreateOdontologo, validatorGetOdontologo };