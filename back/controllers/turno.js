const { matchedData } = require("express-validator");
const { Turno } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { cleanRelationIds } = require("../utils/handleRelations");

const getItems = async (req, res) => {
  try {
    const data = await Turno.findAll({
      include: ["paciente", "odontologo"],
    });
    const cleanedData = cleanRelationIds(data, ["paciente", "odontologo"]);
    res.send({ data: cleanedData });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS", 500, error.message);
  }
};

const getItemDetail = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await Turno.findOne({
      where: { id },
      include: ["paciente", "odontologo"],
    });

    const cleanedData = cleanRelationIds(data, ["paciente", "odontologo"]);
    res.send({ data: cleanedData });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM_DETAIL", 500, error.message);
  }
};

const createtItem = async (req, res) => {
  try {
    req = matchedData(req);
    const data = await Turno.create(req);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM", 500, error.message);
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    await Turno.update(body, { where: { id } });
    const updated = await Turno.findOne({ where: { id } });
    res.send({ data: updated });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEM", 500, error.message);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const deleted = await Turno.destroy({ where: { id } });

    if (!deleted) {
      return handleHttpError(res, "PACIENTE_NOT_FOUND", 404);
    }

    res.send({ deleted });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM", 500, error.message);
  }
};

module.exports = {
  getItems,
  getItemDetail,
  createtItem,
  updateItem,
  deleteItem,
};
