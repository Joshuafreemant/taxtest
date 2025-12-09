import mongoose from "mongoose";

const ShipmentSchema = new mongoose.Schema(
  {
      trackingNumber: {
      type: String,
      required: false,
      unique: true,
      uppercase: true,
      trim: true,
    },
    senderName: {
      type: String,
      required: true,
      trim: true,
    },
    receiverName: {
      type: String,
      required: true,
      trim: true,
    },
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_transit", "delivered", "cancelled"],
      default: "pending",
      lowercase: true,
    },
  },
  { timestamps: true }
);

// Auto-generate tracking number if not provided
const generateTrackingNumber = () => {
  return `TRK${Date.now()}${Math.floor(Math.random() * 1000)}`;
};
const Shipment = mongoose.model("Shipment", ShipmentSchema);

export default Shipment;
export { generateTrackingNumber };