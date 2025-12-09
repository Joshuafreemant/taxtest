import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/database.js";
import shipmentRoutes from "./routes/shipment.route.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Shipment API is running",
    version: "1.0.0",
    endpoints: {
      shipments: "/api/shipments",
      documentation: "See README.md",
    },
  });
});

// API Routes
app.use("/api/shipments", shipmentRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});

export default app;