import Apartment from "../models/Apartment.js";

export const verifyStationAccess = async (req, res, next) => {
  try {
    // User must belong to a station
    if (!req.user.apartment) {
      return res.status(403).json({
        success: false,
        message: "No station assigned to this user",
      });
    }

    const station = await Apartment.findById(req.user.apartment);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }

    req.station = station;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};