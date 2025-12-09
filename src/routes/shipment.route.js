import express from "express";
import {
  getAllShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  deleteShipment,
} from "../controllers/shipment.controller.js";
import {
  createShipmentValidator,
  updateShipmentValidator,
  idValidator,
} from "../validators/shipment.validator.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getAllShipments);
router.get("/:id", idValidator, validateRequest, getShipmentById);
router.post("/", createShipmentValidator, validateRequest, createShipment);
router.put("/:id", updateShipmentValidator, validateRequest, updateShipment);
router.delete("/:id", idValidator, validateRequest, deleteShipment);

export default router;