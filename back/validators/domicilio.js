const { check } = require("express-validator");
const {validateResults} = require("../utils/handleValidator");

const validatorCreateDomicilio = [
  check("calle").exists().notEmpty(),
  check("numero").exists().notEmpty(),
  check("localidad").exists().notEmpty(),
  check("provincia").exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];

const validatorGetDomicilio = [
  check("id").exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];


module.exports = { validatorCreateDomicilio, validatorGetDomicilio };