import Shipment from "../models/shipment.model.js";
// @desc    Get all shipments
// @route   GET /api/shipments
// @access  Public
export const getAllShipments = async (req, res, next) => {
  try {
    const { status, origin, destination, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) query.status = status.toLowerCase();
    if (origin) query.origin = { $regex: origin, $options: "i" };
    if (destination) query.destination = { $regex: destination, $options: "i" };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const shipments = await Shipment.find(query).lean()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Shipment.countDocuments(query);

    res.status(200).json({
      success: true,
      count: shipments.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: shipments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single shipment
// @route   GET /api/shipments/:id
// @access  Public
export const getShipmentById = async (req, res, next) => {
  try {
    const shipment = await Shipment.findById(req.params.id).lean();

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: shipment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new shipment
// @route   POST /api/shipments
// @access  Public
export const createShipment = async (req, res, next) => {
  try {
    const shipment = await Shipment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Shipment created successfully",
      data: shipment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update shipment
// @route   PUT /api/shipments/:id
// @access  Public
export const updateShipment = async (req, res, next) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shipment updated successfully",
      data: shipment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete shipment
// @route   DELETE /api/shipments/:id
// @access  Public
export const deleteShipment = async (req, res, next) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shipment deleted successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};