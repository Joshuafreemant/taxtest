import mongoose from "mongoose";
const { Schema } = mongoose;
const ShipmentSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
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
    },
    destination: {
      type: String,
      required: true,
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


const Shipment = mongoose.model("Shipment", ShipmentSchema);

export default Shipment;
