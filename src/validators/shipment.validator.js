import { body, param } from "express-validator";

export const createShipmentValidator = [
  body("trackingNumber")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Tracking number must be at least 5 characters"),
  body("senderName")
    .trim()
    .notEmpty()
    .withMessage("Sender name is required")
    .isLength({ min: 2 })
    .withMessage("Sender name must be at least 2 characters"),
  body("receiverName")
    .trim()
    .notEmpty()
    .withMessage("Receiver name is required")
    .isLength({ min: 2 })
    .withMessage("Receiver name must be at least 2 characters"),
  body("origin")
    .trim()
    .notEmpty()
    .withMessage("Origin is required"),
  body("destination")
    .trim()
    .notEmpty()
    .withMessage("Destination is required"),
  body("status")
    .optional()
    .isIn(["pending", "in_transit", "delivered", "cancelled"])
    .withMessage("Invalid status value"),
];

export const updateShipmentValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid shipment ID"),
  body("trackingNumber")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Tracking number must be at least 5 characters"),
  body("senderName")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Sender name must be at least 2 characters"),
  body("receiverName")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Receiver name must be at least 2 characters"),
  body("origin")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Origin cannot be empty"),
  body("destination")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Destination cannot be empty"),
  body("status")
    .optional()
    .isIn(["pending", "in_transit", "delivered", "cancelled"])
    .withMessage("Invalid status value"),
];

export const idValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid shipment ID"),
];