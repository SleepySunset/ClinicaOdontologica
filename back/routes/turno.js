const express = require("express");
const router = express.Router();
const {
  validatorCreateTurno,
  validatorGetTurno,
} = require("../validators/turno");

const {
  getItems,
  getItemDetail,
  createtItem,
  updateItem,
  deleteItem,
} = require("../controllers/turno");

router.get("/", getItems);
router.get("/:id", validatorGetTurno, getItemDetail);
router.post("/", validatorCreateTurno, createtItem);
router.put("/:id", validatorCreateTurno, validatorGetTurno, updateItem);
router.delete("/:id", validatorGetTurno, deleteItem);

module.exports = router;
