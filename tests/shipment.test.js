import request from "supertest";
import app from "../src/server.js";
import mongoose from "mongoose";
import Shipment from "../src/models/Shipment.js";

describe("Shipment API Tests", () => {
  let shipmentId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await Shipment.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /api/shipments", () => {
    it("should create a new shipment", async () => {
      const newShipment = {
        trackingNumber: "TRK123456",
        sender: "679569133f0412f3c6b7f58b",
        receive: "679569133f0412f3c6b7f32e",
        origin: "Lagos",
        destination: "Abuja",
        status: "pending",
      };

      const response = await request(app)
        .post("/api/shipments")
        .send(newShipment)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.senderName).toBe("John Doe");
      expect(response.body.data.trackingNumber).toBe("TRK123456");
      
      shipmentId = response.body.data._id;
    });

    it("should return validation error for missing required fields", async () => {
      const invalidShipment = {
        trackingNumber: "TRK789",
      };

      const response = await request(app)
        .post("/api/shipments")
        .send(invalidShipment)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("GET /api/shipments", () => {
    it("should get all shipments", async () => {
      const response = await request(app)
        .get("/api/shipments")
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("GET /api/shipments/:id", () => {
    it("should get a single shipment", async () => {
      const response = await request(app)
        .get(`/api/shipments/${shipmentId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(shipmentId);
    });

    it("should return 404 for non-existent shipment", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/shipments/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /api/shipments/:id", () => {
    it("should update a shipment", async () => {
      const updates = {
        status: "in_transit",
      };

      const response = await request(app)
        .put(`/api/shipments/${shipmentId}`)
        .send(updates)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe("in_transit");
    });
  });

  describe("DELETE /api/shipments/:id", () => {
    it("should delete a shipment", async () => {
      const response = await request(app)
        .delete(`/api/shipments/${shipmentId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });
});