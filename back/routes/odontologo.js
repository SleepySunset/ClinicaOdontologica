const express = require("express");
const router = express.Router();
const {
  validatorCreateOdontologo,
  validatorGetOdontologo,
} = require("../validators/odontologo");

const {
  getItems,
  getItemDetail,
  createtItem,
  updateItem,
  deleteItem,
} = require("../controllers/odontologo");

router.get("/", getItems);
router.get("/:id", validatorGetOdontologo, getItemDetail);
router.post("/", validatorCreateOdontologo, createtItem);
router.put(
  "/:id",
  validatorGetOdontologo,
  validatorCreateOdontologo,
  updateItem
);
router.delete("/:id", validatorGetOdontologo, deleteItem);

module.exports = router;
