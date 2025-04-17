const express = require("express");
const router = express.Router();
const { validatorCreatePaciente, validatorGetPaciente } = require("../validators/paciente");

const {
  getItems,
  getItemDetail,
  createtItem,
  updateItem,
  deleteItem,
} = require("../controllers/paciente");

router.get("/", getItems);
router.get("/:id",validatorGetPaciente, getItemDetail);
router.post("/", validatorCreatePaciente, createtItem);
router.put("/:id", validatorGetPaciente, validatorCreatePaciente, updateItem);
router.delete("/:id",validatorGetPaciente, deleteItem);

module.exports = router;
