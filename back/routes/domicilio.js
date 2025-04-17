const express = require("express");
const router = express.Router();
const { validatorCreateDomicilio, validatorGetDomicilio } = require("../validators/domicilio");

const {
  getItems,
  getItemDetail,
  createtItem,
  updateItem,
  deleteItem,
} = require("../controllers/domicilio");

router.get("/", getItems);
router.get("/:id", validatorGetDomicilio, getItemDetail);
router.post("/", validatorCreateDomicilio, createtItem);
router.put("/:id", validatorCreateDomicilio, validatorGetDomicilio, updateItem);
router.delete("/:id", validatorGetDomicilio, deleteItem);

module.exports = router;
